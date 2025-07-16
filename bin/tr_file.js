#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const TranslateCommand = require('../src/translate-command');

program
  .version('1.4.3')
  .description('Translate JSON files using Google Translate API\n\n🚀 Try the Live Demo: https://tr-file.checkleaked.cc')
  .argument('<source>', 'Source JSON file (e.g., en.json) or filename to search recursively')
  .argument('<languages>', 'Target languages separated by comma (e.g., es,ja,pt)')
  .option('-k, --key <key>', 'Google Translate API key (optional - uses built-in key if not provided)')
  .option('-d, --delay <ms>', 'Delay between requests in milliseconds', '50')
  .option('-s, --source-lang <lang>', 'Source language code (e.g., en, es, fr) - auto-detected if not provided')
  .option('-r, --recursive', 'Search for source file in all subdirectories')
  .action(async (source, languages, options) => {
    try {
      const targetLanguages = languages.split(',').map(lang => lang.trim());
      
      if (options.recursive) {
        // Search for files recursively - extract just the filename
        const filename = path.basename(source);
        const RecursiveTranslator = require('../src/recursive-translator');
        const recursiveTranslator = new RecursiveTranslator({
          filename,
          targetLanguages,
          apiKey: options.key,
          delay: parseInt(options.delay) || 50,
          sourceLanguage: options.sourceLang
        });
        
        await recursiveTranslator.execute();
      } else {
        // Single file translation
        const sourceFile = path.resolve(source);
        const translateCommand = new TranslateCommand({
          sourceFile,
          targetLanguages,
          apiKey: options.key,
          delay: parseInt(options.delay) || 50,
          sourceLanguage: options.sourceLang
        });

        await translateCommand.execute();
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
