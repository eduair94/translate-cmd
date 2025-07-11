const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const TranslateCommand = require('./translate-command');

class RecursiveTranslator {
  constructor(options) {
    this.filename = options.filename;
    this.targetLanguages = options.targetLanguages;
    this.sourceLanguage = options.sourceLanguage;
    this.apiKey = options.apiKey;
    this.delay = options.delay || 50;
  }

  async execute() {
    console.log(chalk.blue(`🔍 Searching for '${this.filename}' files recursively...`));
    
    const currentDir = process.cwd();
    
    // Search for files recursively (including current directory)
    const foundFiles = await this.findFilesRecursively(currentDir, this.filename);
    
    if (foundFiles.length === 0) {
      console.log(chalk.yellow(`⚠️  No '${this.filename}' files found in current directory and subdirectories.`));
      console.log(chalk.gray(`💡 Make sure the file exists and try running from the correct directory.`));
      console.log(chalk.gray(`💡 Example: tr_file en.json es,fr -r`));
      return;
    }
    
    console.log(chalk.green(`✓ Found ${foundFiles.length} file(s):`));
    foundFiles.forEach(file => {
      const relativePath = path.relative(currentDir, file);
      console.log(chalk.gray(`  📄 ${relativePath || this.filename}`));
    });
    
    console.log('');
    
    // Translate each file
    for (let i = 0; i < foundFiles.length; i++) {
      const sourceFile = foundFiles[i];
      const relativePath = path.relative(currentDir, sourceFile);
      
      console.log(chalk.blue(`\n📁 Processing: ${relativePath || this.filename} (${i + 1}/${foundFiles.length})`));
      
      try {
        const translateCommand = new TranslateCommand({
          sourceFile,
          targetLanguages: this.targetLanguages,
          sourceLanguage: this.sourceLanguage,
          apiKey: this.apiKey,
          delay: this.delay
        });
        
        await translateCommand.execute();
      } catch (error) {
        console.error(chalk.red(`❌ Failed to translate ${relativePath || this.filename}: ${error.message}`));
      }
    }
    
    console.log(chalk.green.bold(`\n🎉 Recursive translation completed! Processed ${foundFiles.length} file(s).`));
  }

  async findFilesRecursively(dir, filename) {
    const foundFiles = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Skip common directories that shouldn't contain translation files
          if (this.shouldSkipDirectory(entry.name)) {
            continue;
          }
          
          // Recursively search subdirectories
          const subFiles = await this.findFilesRecursively(fullPath, filename);
          foundFiles.push(...subFiles);
        } else if (entry.isFile() && entry.name === filename) {
          foundFiles.push(fullPath);
        }
      }
    } catch (error) {
      // Skip directories we can't read (permissions, etc.)
      if (!error.message.includes('ENOENT')) {
        console.log(chalk.gray(`⚠️  Skipping directory: ${path.relative(process.cwd(), dir)} (${error.message})`));
      }
    }
    
    return foundFiles;
  }

  shouldSkipDirectory(dirName) {
    const skipDirs = [
      'node_modules',
      '.git',
      '.svn',
      '.hg',
      'dist',
      'build',
      'out',
      '.next',
      '.nuxt',
      'coverage',
      '.nyc_output',
      'logs',
      'tmp',
      'temp',
      '.cache',
      '.vscode',
      '.idea',
      'vendor',
      'target'
    ];
    
    return skipDirs.includes(dirName) || dirName.startsWith('.');
  }
}

module.exports = RecursiveTranslator;
