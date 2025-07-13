const TranslateCommand = require('./src/translate-command');
const TranslateAPI = require('./src/translate-api');

// Main API function for translating JSON objects
const translateJSON = async (jsonData, targetLanguages, options = {}) => {
  const api = new TranslateAPI(options);
  return await api.translateJSON(jsonData, targetLanguages);
};

// File-based translation (existing functionality)
const translateFile = async (sourceFile, targetLanguages, options = {}) => {
  const translateCommand = new TranslateCommand({
    sourceFile,
    targetLanguages,
    ...options
  });
  return await translateCommand.execute();
};

// Export both the class and convenience functions
module.exports = {
  TranslateCommand,
  TranslateAPI,
  translateJSON,
  translateFile,
  // Default export for backward compatibility
  default: TranslateCommand
};
