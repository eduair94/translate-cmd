const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');

class TranslateCommand {
  constructor(options) {
    this.sourceFile = options.sourceFile;
    this.targetLanguages = options.targetLanguages;
    this.sourceLanguage = options.sourceLanguage; // Can be null for auto-detection
    this.apiKey = options.apiKey || process.env.GOOGLE_TRANSLATE_API_KEY || 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw';
    this.delay = options.delay || 50;
    this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    this.detectUrl = 'https://translation.googleapis.com/language/translate/v2/detect';
    
    if (!this.apiKey) {
      throw new Error('Google Translate API key is required. Use -k flag or set GOOGLE_TRANSLATE_API_KEY environment variable.');
    }
  }

  async execute() {
    try {
      console.log(chalk.blue('🌍 Starting translation process...'));
      
      // Load source file
      const sourceData = await this.loadSourceFile();
      console.log(chalk.green(`✓ Loaded source file: ${path.basename(this.sourceFile)}`));
      
      // Extract all translatable strings
      const strings = this.extractStrings(sourceData);
      const uniqueStrings = [...new Set(strings.map(s => s.text))];
      console.log(chalk.green(`✓ Found ${strings.length} strings to translate (${uniqueStrings.length} unique)`));
      
      // Detect or validate source language
      let detectedSourceLang = this.sourceLanguage;
      if (!detectedSourceLang) {
        // Auto-detect source language using first few strings
        const sampleTexts = uniqueStrings.slice(0, 3);
        detectedSourceLang = await this.detectLanguage(sampleTexts);
        console.log(chalk.cyan(`🔍 Auto-detected source language: ${detectedSourceLang.toUpperCase()}`));
      } else {
        console.log(chalk.cyan(`📝 Using specified source language: ${detectedSourceLang.toUpperCase()}`));
      }
      
      // Filter out target languages that are the same as source
      const filteredTargetLanguages = this.targetLanguages.filter(lang => 
        lang.toLowerCase() !== detectedSourceLang.toLowerCase()
      );
      
      if (filteredTargetLanguages.length !== this.targetLanguages.length) {
        const skipped = this.targetLanguages.length - filteredTargetLanguages.length;
        console.log(chalk.yellow(`⚠️  Skipped ${skipped} target language(s) that match source language`));
      }
      
      if (filteredTargetLanguages.length === 0) {
        console.log(chalk.yellow('⚠️  No target languages to translate to after filtering'));
        return;
      }
      
      // Translate to each target language
      for (const language of filteredTargetLanguages) {
        await this.translateToLanguage(sourceData, strings, language, detectedSourceLang);
      }
      
      console.log(chalk.green.bold('🎉 Translation completed successfully!'));
      
    } catch (error) {
      console.error(chalk.red('❌ Translation failed:'), error.message);
      throw error;
    }
  }

  async loadSourceFile() {
    try {
      const content = await fs.readFile(this.sourceFile, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Source file not found: ${this.sourceFile}`);
      }
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in source file: ${this.sourceFile}`);
      }
      throw error;
    }
  }

  async detectLanguage(texts) {
    try {
      const sampleText = texts.slice(0, 3).join(' ');
      const response = await axios.post(
        `${this.detectUrl}?key=${this.apiKey}`,
        {
          q: sampleText
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      if (response.data && response.data.data && response.data.data.detections) {
        const detection = response.data.data.detections[0][0];
        return detection.language;
      } else {
        throw new Error('Unable to detect language');
      }
    } catch (error) {
      console.log(chalk.yellow('⚠️  Language detection failed, defaulting to English (en)'));
      return 'en'; // Default fallback
    }
  }

  extractStrings(obj, prefix = '') {
    const strings = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        strings.push({
          path: currentPath,
          text: value
        });
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Only recurse if it's a true nested object (not a flat key with dots)
        strings.push(...this.extractStrings(value, currentPath));
      }
    }
    
    return strings;
  }

  async translateToLanguage(sourceData, strings, targetLanguage, sourceLanguage) {
    const spinner = ora(`Translating from ${sourceLanguage.toUpperCase()} to ${targetLanguage.toUpperCase()}...`).start();
    try {
      const outputFile = this.getOutputFilePath(targetLanguage);
      // Load existing translation file if it exists
      let existingData = {};
      try {
        const existingContent = await fs.readFile(outputFile, 'utf8');
        existingData = JSON.parse(existingContent);
        spinner.text = `Found existing ${targetLanguage.toUpperCase()} file, merging translations...`;
      } catch (error) {
        // File doesn't exist or is invalid, start fresh
        spinner.text = `Creating new ${targetLanguage.toUpperCase()} translation file...`;
      }

      // Use the TranslateAPI class for consistent translation behavior
      const TranslateAPI = require('./translate-api');
      const translateAPI = new TranslateAPI({
        apiKey: this.apiKey,
        sourceLanguage: sourceLanguage,
        delay: this.delay,
        verbose: true // Enable verbose for API request logging
      });

      // Get the translated data using the API (preserves structure)
      const translationResult = await translateAPI.translateJSON(sourceData, [targetLanguage]);
      const translatedData = translationResult[targetLanguage];

      // Merge with existing data if any
      const mergedData = this.deepMerge(existingData, translatedData);

      // Count new vs existing translations
      const existingKeys = this.countKeys(existingData);
      const mergedKeys = this.countKeys(mergedData);
      const newKeys = mergedKeys - existingKeys;

      // Only write and report if there are new keys
      if (newKeys > 0) {
        await fs.writeFile(outputFile, JSON.stringify(mergedData, null, 2), 'utf8');
        spinner.succeed(`${targetLanguage.toUpperCase()} translation completed → ${path.basename(outputFile)} (${newKeys} new, ${existingKeys} existing)`);
      } else {
        spinner.succeed(`${targetLanguage.toUpperCase()} translation up to date → ${path.basename(outputFile)} (no new keys)`);
      }
    } catch (error) {
      spinner.fail(`Failed to translate to ${targetLanguage.toUpperCase()}`);
      throw error;
    }
  }

  async batchTranslateTexts(texts, targetLanguage, sourceLanguage) {
    const MAX_BATCH_SIZE = 128; // Google Translate API limit
    const MAX_CHARS_PER_REQUEST = 30000; // Conservative limit to avoid hitting API limits
    
    const results = [];
    let currentBatch = [];
    let currentBatchSize = 0;
    
    for (const text of texts) {
      const textLength = text.length;
      
      // If adding this text would exceed limits, process current batch
      if (currentBatch.length >= MAX_BATCH_SIZE || 
          currentBatchSize + textLength > MAX_CHARS_PER_REQUEST) {
        
        if (currentBatch.length > 0) {
          const batchResults = await this.translateBatch(currentBatch, targetLanguage, sourceLanguage);
          results.push(...batchResults);
          currentBatch = [];
          currentBatchSize = 0;
          
          // Add delay between batches
          if (currentBatch.length > 0) {
            await this.sleep(this.delay);
          }
        }
      }
      
      currentBatch.push(text);
      currentBatchSize += textLength;
    }
    
    // Process final batch
    if (currentBatch.length > 0) {
      const batchResults = await this.translateBatch(currentBatch, targetLanguage, sourceLanguage);
      results.push(...batchResults);
    }
    
    return results;
  }

  async translateBatch(texts, targetLanguage, sourceLanguage) {
    try {
      const requestBody = {
        q: texts,
        target: targetLanguage,
        format: 'text'
      };
      
      // Add source language if provided
      if (sourceLanguage) {
        requestBody.source = sourceLanguage;
      }
      
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000 // Longer timeout for batch requests
        }
      );

      if (response.data && response.data.data && response.data.data.translations) {
        return response.data.data.translations.map(t => t.translatedText);
      } else {
        throw new Error('Invalid response from Google Translate API');
      }
    } catch (error) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach Google Translate API');
      } else {
        throw new Error(`Translation error: ${error.message}`);
      }
    }
  }

  async translateString(text, targetLanguage) {
    try {
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        {
          q: text,
          target: targetLanguage
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      if (response.data && response.data.data && response.data.data.translations) {
        return response.data.data.translations[0].translatedText;
      } else {
        throw new Error('Invalid response from Google Translate API');
      }
    } catch (error) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach Google Translate API');
      } else {
        throw new Error(`Translation error: ${error.message}`);
      }
    }
  }

  setNestedValue(obj, path, value) {
    // Check if this is a flat key (exists directly in the object)
    if (obj.hasOwnProperty(path)) {
      obj[path] = value;
      return;
    }
    
    // Handle nested object paths
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  getOutputFilePath(language) {
    const sourceDir = path.dirname(this.sourceFile);
    const sourceExt = path.extname(this.sourceFile);
    return path.join(sourceDir, `${language}${sourceExt}`);
  }

  deepMerge(existing, newData) {
    if (!existing || typeof existing !== 'object') {
      return newData;
    }
    if (!newData || typeof newData !== 'object') {
      return existing;
    }

    const result = { ...existing };
    
    for (const [key, value] of Object.entries(newData)) {
      if (Array.isArray(value)) {
        // For arrays, replace entirely (preserving array structure)
        result[key] = value;
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        // For objects, merge recursively
        result[key] = this.deepMerge(result[key], value);
      } else {
        // For primitives, only add if not already present
        if (!(key in result)) {
          result[key] = value;
        }
      }
    }
    
    return result;
  }

  countKeys(obj, count = 0) {
    if (!obj || typeof obj !== 'object') {
      return count;
    }
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        count++;
      } else if (Array.isArray(value)) {
        // Count each array element that contains strings
        for (const item of value) {
          count += this.countKeys(item);
        }
      } else if (typeof value === 'object' && value !== null) {
        count += this.countKeys(value);
      }
    }
    
    return count;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = TranslateCommand;
