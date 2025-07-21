const axios = require('axios');
const chalk = require('chalk');

class TranslateAPI {
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.GOOGLE_TRANSLATE_API_KEY || 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw';
    this.sourceLanguage = options.sourceLanguage;
    this.delay = options.delay || 50;
    this.verbose = options.verbose !== false; // Default to true
    this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    this.detectUrl = 'https://translation.googleapis.com/language/translate/v2/detect';
    
    if (!this.apiKey) {
      throw new Error('Google Translate API key is required. Provide it in options.apiKey or set GOOGLE_TRANSLATE_API_KEY environment variable.');
    }
  }

  /**
   * Translate a JSON object to multiple target languages
   * @param {Object} jsonData - The JSON object to translate
   * @param {string|Array} targetLanguages - Target language(s) (e.g., 'es' or ['es', 'fr', 'de'])
   * @param {Object} options - Additional options
   * @returns {Object} Object with translations for each target language
   */
  async translateJSON(jsonData, targetLanguages, options = {}) {
    try {
      // Ensure targetLanguages is an array
      const langs = Array.isArray(targetLanguages) ? targetLanguages : [targetLanguages];
      
      if (this.verbose) {
        console.log(chalk.blue('🌍 Starting JSON translation...'));
      }
      
      // Validate input
      if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('Input must be a valid JSON object');
      }
      
      if (langs.length === 0) {
        throw new Error('At least one target language must be specified');
      }
      
      // Extract all translatable strings
      const strings = this.extractStrings(jsonData);
      const uniqueStrings = [...new Set(strings.map(s => s.text))];
      
      if (this.verbose) {
        console.log(chalk.green(`✓ Found ${strings.length} strings to translate (${uniqueStrings.length} unique)`));
      }
      
      // Detect or validate source language
      let detectedSourceLang = this.sourceLanguage;
      if (!detectedSourceLang && uniqueStrings.length > 0) {
        const sampleTexts = uniqueStrings.slice(0, 3);
        detectedSourceLang = await this.detectLanguage(sampleTexts);
        if (this.verbose) {
          console.log(chalk.cyan(`🔍 Auto-detected source language: ${detectedSourceLang.toUpperCase()}`));
        }
      } else if (detectedSourceLang && this.verbose) {
        console.log(chalk.cyan(`📝 Using specified source language: ${detectedSourceLang.toUpperCase()}`));
      }
      
      // Filter out target languages that are the same as source
      const filteredTargetLanguages = langs.filter(lang => 
        lang.toLowerCase() !== (detectedSourceLang || 'en').toLowerCase()
      );
      
      if (filteredTargetLanguages.length !== langs.length && this.verbose) {
        const skipped = langs.length - filteredTargetLanguages.length;
        console.log(chalk.yellow(`⚠️  Skipped ${skipped} target language(s) that match source language`));
      }
      
      if (filteredTargetLanguages.length === 0) {
        if (this.verbose) {
          console.log(chalk.yellow('⚠️  No target languages to translate to after filtering'));
        }
        return {};
      }
      
      // Translate to each target language
      const results = {};
      for (const language of filteredTargetLanguages) {
        results[language] = await this.translateToLanguage(jsonData, strings, language, detectedSourceLang);
      }
      
      if (this.verbose) {
        console.log(chalk.green.bold('🎉 JSON translation completed successfully!'));
      }
      
      return results;
      
    } catch (error) {
      if (this.verbose) {
        console.error(chalk.red('❌ Translation failed:'), error.message);
      }
      throw error;
    }
  }

  /**
   * Translate specific strings to a target language
   * @param {Array} strings - Array of strings to translate
   * @param {string} targetLanguage - Target language code
   * @param {string} sourceLanguage - Source language code (optional)
   * @returns {Array} Array of translated strings
   */
  async translateStrings(strings, targetLanguage, sourceLanguage = null) {
    if (!Array.isArray(strings) || strings.length === 0) {
      return [];
    }
    
    const uniqueStrings = [...new Set(strings)];
    const translatedTexts = await this.batchTranslateTexts(uniqueStrings, targetLanguage, sourceLanguage);
    
    // Create a mapping from original to translated text
    const translationMap = new Map();
    for (let i = 0; i < uniqueStrings.length; i++) {
      translationMap.set(uniqueStrings[i], translatedTexts[i]);
    }
    
    // Return translations in the same order as input
    return strings.map(str => translationMap.get(str) || str);
  }

  /**
   * Detect the language of given text(s)
   * @param {string|Array} texts - Text(s) to analyze
   * @returns {string} Detected language code
   */
  async detectLanguage(texts) {
    try {
      const textArray = Array.isArray(texts) ? texts : [texts];
      const sampleText = textArray.slice(0, 3).join(' ');
      
      // Log language detection API request
      if (this.verbose) {
        console.log(chalk.blue(`📡 Language Detection: ${sampleText.length} chars`));
      }
      
      const response = await axios.post(
        `${this.detectUrl}?key=${this.apiKey}`,
        { q: sampleText },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );

      if (response.data?.data?.detections) {
        const detection = response.data.data.detections[0][0];
        return detection.language;
      } else {
        throw new Error('Unable to detect language');
      }
    } catch (error) {
      if (this.verbose) {
        console.log(chalk.yellow('⚠️  Language detection failed, defaulting to English (en)'));
      }
      return 'en'; // Default fallback
    }
  }

  async translateToLanguage(sourceData, strings, targetLanguage, sourceLanguage) {
    if (this.verbose) {
      console.log(chalk.blue(`Translating to ${targetLanguage.toUpperCase()}...`));
    }
    
    // Extract unique texts that need translation
    const textsToTranslate = [...new Set(strings.map(s => s.text))];
    
    if (textsToTranslate.length === 0) {
      return JSON.parse(JSON.stringify(sourceData)); // Deep copy
    }
    
    // Batch translate all texts
    const translatedTexts = await this.batchTranslateTexts(textsToTranslate, targetLanguage, sourceLanguage);
    
    // Create a mapping from original to translated text
    const translationMap = new Map();
    for (let i = 0; i < textsToTranslate.length; i++) {
      translationMap.set(textsToTranslate[i], translatedTexts[i]);
    }
    
    // Start with a deep copy of the source data to preserve structure
    const translatedData = JSON.parse(JSON.stringify(sourceData));
    
    // Apply translations only to translatable strings, preserving original structure
    // Sort so that flat keys are processed last (they take precedence)
    const sortedStrings = strings.sort((a, b) => {
      if (a.path === b.path) {
        return a.isFlatKey ? 1 : -1; // Flat keys come after nested keys
      }
      return 0;
    });
    
    for (const { path: stringPath, text, isFlatKey } of sortedStrings) {
      const translatedText = translationMap.get(text) || text;
      // Use the original source data structure to determine how to set values
      this.setNestedValuePreservingStructure(translatedData, sourceData, stringPath, translatedText, isFlatKey);
    }
    
    if (this.verbose) {
      console.log(chalk.green(`✓ ${targetLanguage.toUpperCase()} translation completed (${textsToTranslate.length} strings)`));
    }
    
    return translatedData;
  }

  extractStrings(obj, prefix = '', rootObj = null) {
    const strings = [];
    
    // Use rootObj to reference the original object for checking flat keys
    if (rootObj === null) {
      rootObj = obj;
    }
    
    if (Array.isArray(obj)) {
      // Handle arrays
      obj.forEach((item, index) => {
        const currentPath = prefix ? `${prefix}[${index}]` : `[${index}]`;
        
        if (typeof item === 'string') {
          strings.push({
            path: currentPath,
            text: item
          });
        } else if (typeof item === 'object' && item !== null) {
          strings.push(...this.extractStrings(item, currentPath, rootObj));
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      // Handle objects
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'string') {
          // Check if this is a flat key (exists at root level with dots in the key name)
          const isTopLevelFlatKey = !prefix && rootObj.hasOwnProperty(key);
          
          strings.push({
            path: currentPath,
            text: value,
            isFlatKey: isTopLevelFlatKey
          });
        } else if (Array.isArray(value)) {
          strings.push(...this.extractStrings(value, currentPath, rootObj));
        } else if (typeof value === 'object' && value !== null) {
          strings.push(...this.extractStrings(value, currentPath, rootObj));
        }
      }
    }
    
    return strings;
  }

  async batchTranslateTexts(texts, targetLanguage, sourceLanguage) {
    const MAX_BATCH_SIZE = 128;
    const MAX_CHARS_PER_REQUEST = 30000;
    
    const results = [];
    let currentBatch = [];
    let currentBatchSize = 0;
    
    for (const text of texts) {
      const textLength = text.length;
      
      if (currentBatch.length >= MAX_BATCH_SIZE || 
          currentBatchSize + textLength > MAX_CHARS_PER_REQUEST) {
        
        if (currentBatch.length > 0) {
          const batchResults = await this.translateBatch(currentBatch, targetLanguage, sourceLanguage);
          results.push(...batchResults);
          currentBatch = [];
          currentBatchSize = 0;
          
          if (this.delay > 0) {
            await this.sleep(this.delay);
          }
        }
      }
      
      currentBatch.push(text);
      currentBatchSize += textLength;
    }
    
    if (currentBatch.length > 0) {
      const batchResults = await this.translateBatch(currentBatch, targetLanguage, sourceLanguage);
      results.push(...batchResults);
    }
    
    return results;
  }

  /**
   * Protect placeholders in curly braces from translation
   * @param {string} text - Text containing placeholders
   * @returns {Object} Object with protected text and placeholder map
   */
  protectPlaceholders(text) {
    const placeholderMap = new Map();
    const placeholderRegex = /\{[^}]+\}/g;
    let protectedText = text;
    let match;
    let index = 0;
    
    while ((match = placeholderRegex.exec(text)) !== null) {
      const placeholder = match[0];
      const protectionToken = `__PLACEHOLDER_${index}__`;
      placeholderMap.set(protectionToken, placeholder);
      protectedText = protectedText.replace(placeholder, protectionToken);
      index++;
    }
    
    return { protectedText, placeholderMap };
  }

  /**
   * Restore placeholders in translated text
   * @param {string} translatedText - Translated text with protection tokens
   * @param {Map} placeholderMap - Map of protection tokens to original placeholders
   * @returns {string} Text with restored placeholders
   */
  restorePlaceholders(translatedText, placeholderMap) {
    let restoredText = translatedText;
    
    for (const [token, placeholder] of placeholderMap) {
      restoredText = restoredText.replace(new RegExp(token, 'g'), placeholder);
    }
    
    return restoredText;
  }

  async translateBatch(texts, targetLanguage, sourceLanguage) {
    try {
      // Protect placeholders in all texts
      const protectedTexts = texts.map(text => this.protectPlaceholders(text));
      const textsToTranslate = protectedTexts.map(p => p.protectedText);
      
      // Calculate total characters being sent
      const totalChars = textsToTranslate.reduce((sum, text) => sum + text.length, 0);
      
      // Log API request details
      if (this.verbose) {
        console.log(chalk.blue(`📡 API Request: ${texts.length} strings, ${totalChars} chars → ${targetLanguage.toUpperCase()}`));
      }
      
      const requestBody = {
        q: textsToTranslate,
        target: targetLanguage,
        format: 'text'
      };
      
      if (sourceLanguage) {
        requestBody.source = sourceLanguage;
      }
      
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      if (response.data?.data?.translations) {
        const translatedTexts = response.data.data.translations.map(t => t.translatedText);
        
        // Restore placeholders in translated texts
        return translatedTexts.map((translatedText, index) => {
          const { placeholderMap } = protectedTexts[index];
          return this.restorePlaceholders(translatedText, placeholderMap);
        });
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
    // First, check if this is a flat key that exists directly in the source object
    // This preserves keys like "test.test" as literal keys rather than nested paths
    if (typeof obj === 'object' && obj !== null && obj.hasOwnProperty(path)) {
      obj[path] = value;
      return;
    }
    
    // Handle pure array index like "[0]", "[1]", etc.
    if (path.match(/^\[\d+\]$/)) {
      const index = parseInt(path.slice(1, -1));
      while (obj.length <= index) {
        obj.push(null);
      }
      obj[index] = value;
      return;
    }
    
    // For complex paths, only proceed if the flat key doesn't already exist
    // This prevents "edge.cases" from being created as nested when it should be flat
    const pathParts = this.parsePath(path);
    
    // If this is a simple key (no arrays or complex nesting), check if it should be flat
    if (pathParts.length === 1 && pathParts[0].type === 'object') {
      // Don't create nested structure for simple dotted keys
      obj[path] = value;
      return;
    }
    
    // Handle complex paths with arrays and actual nesting
    let current = obj;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      
      if (part.type === 'array') {
        if (part.key && !Array.isArray(current[part.key])) {
          current[part.key] = [];
        }
        
        const targetArray = part.key ? current[part.key] : current;
        
        // Ensure array has enough elements
        while (targetArray.length <= part.index) {
          targetArray.push(null);
        }
        
        if (targetArray[part.index] === null || targetArray[part.index] === undefined) {
          // Determine if next part is array or object
          const nextPart = pathParts[i + 1];
          targetArray[part.index] = nextPart && nextPart.type === 'array' ? [] : {};
        }
        current = targetArray[part.index];
      } else {
        if (!(part.key in current)) {
          // Determine if next part is array or object
          const nextPart = pathParts[i + 1];
          current[part.key] = nextPart && nextPart.type === 'array' ? [] : {};
        }
        current = current[part.key];
      }
    }
    
    // Set the final value
    const finalPart = pathParts[pathParts.length - 1];
    if (finalPart.type === 'array') {
      const targetArray = finalPart.key ? current[finalPart.key] : current;
      if (!Array.isArray(targetArray)) {
        return; // Skip if target is not an array
      }
      while (targetArray.length <= finalPart.index) {
        targetArray.push(null);
      }
      targetArray[finalPart.index] = value;
    } else {
      current[finalPart.key] = value;
    }
  }

  setNestedValuePreservingStructure(targetObj, sourceObj, path, value, isFlatKey = false) {
    // If this is marked as a flat key, treat it as such
    if (isFlatKey) {
      targetObj[path] = value;
      return;
    }
    
    // For nested paths, we need to navigate properly even if a flat key exists
    // This is the key difference - we use a custom navigation method
    this.setNestedValueForcePath(targetObj, path, value);
  }
  
  setNestedValueForcePath(obj, path, value) {
    // Handle pure array index like "[0]", "[1]", etc.
    if (path.match(/^\[\d+\]$/)) {
      const index = parseInt(path.slice(1, -1));
      while (obj.length <= index) {
        obj.push(null);
      }
      obj[index] = value;
      return;
    }
    
    // Check if any part of the path exists as a flat key
    const pathParts = path.split('.');
    for (let i = 1; i < pathParts.length; i++) {
      const flatKeyPath = pathParts.slice(0, i).join('.');
      if (obj.hasOwnProperty(flatKeyPath)) {
        // Navigate into the flat key object and set the remaining path
        const remainingPath = pathParts.slice(i).join('.');
        if (obj[flatKeyPath] && typeof obj[flatKeyPath] === 'object') {
          this.setNestedValue(obj[flatKeyPath], remainingPath, value);
        }
        return;
      }
    }
    
    // Handle complex paths with arrays and actual nesting
    const parsedParts = this.parsePath(path);
    
    let current = obj;
    
    for (let i = 0; i < parsedParts.length - 1; i++) {
      const part = parsedParts[i];
      
      if (part.type === 'array') {
        if (part.key && !Array.isArray(current[part.key])) {
          current[part.key] = [];
        }
        
        const targetArray = part.key ? current[part.key] : current;
        
        // Ensure array has enough elements
        while (targetArray.length <= part.index) {
          targetArray.push(null);
        }
        
        // Navigate to the array element
        current = targetArray[part.index];
        
        // Create object if it doesn't exist
        if (current === null || current === undefined) {
          current = {};
          targetArray[part.index] = current;
        }
      } else {
        // Object navigation
        if (!current[part.key] || typeof current[part.key] !== 'object') {
          current[part.key] = {};
        }
        current = current[part.key];
      }
    }
    
    // Set the final value
    const finalPart = parsedParts[parsedParts.length - 1];
    if (finalPart.type === 'array') {
      const targetArray = finalPart.key ? current[finalPart.key] : current;
      if (!Array.isArray(targetArray)) {
        return; // Skip if target is not an array
      }
      while (targetArray.length <= finalPart.index) {
        targetArray.push(null);
      }
      targetArray[finalPart.index] = value;
    } else {
      current[finalPart.key] = value;
    }
  }

  pathExistsInSource(obj, path) {
    // Check if this exact path exists as a direct property
    if (typeof obj === 'object' && obj !== null && obj.hasOwnProperty(path)) {
      return true;
    }
    
    // For complex paths, check if any parent level exists as a flat key
    const pathParts = path.split('.');
    for (let i = 1; i < pathParts.length; i++) {
      const partialPath = pathParts.slice(0, i).join('.');
      if (obj.hasOwnProperty(partialPath)) {
        // This parent exists as a flat key, so we should navigate into it
        // instead of creating a nested structure
        return true;
      }
    }
    
    return false;
  }

  parsePath(path) {
    const parts = [];
    const segments = path.split('.');
    
    for (const segment of segments) {
      const arrayMatch = segment.match(/^(.+?)\[(\d+)\]$/);
      if (arrayMatch) {
        // Handle array access like "items[0]"
        parts.push({ type: 'object', key: arrayMatch[1] });
        parts.push({ type: 'array', key: '', index: parseInt(arrayMatch[2]) });
      } else if (segment.match(/^\[(\d+)\]$/)) {
        // Handle pure array access like "[0]"
        const index = parseInt(segment.slice(1, -1));
        parts.push({ type: 'array', key: '', index });
      } else {
        // Regular object key
        parts.push({ type: 'object', key: segment });
      }
    }
    
    return parts;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = TranslateAPI;
