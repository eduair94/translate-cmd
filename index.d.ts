import { TranslateAPI, TranslateOptions, TranslateJSONOptions, TranslationResult } from './src/translate-api';
import { TranslateCommand, RecursiveTranslator } from './src/translate-command';

/**
 * Convenience function to translate JSON objects
 * Features:
 * - Preserves original JSON structure (flat keys remain flat, nested objects remain nested)
 * - Protects placeholders in curly braces from translation (e.g., {username}, {count})
 * - Maintains non-string values (numbers, booleans, null, etc.)
 * - Supports arrays and mixed data types
 * @param jsonData - The JSON object or array to translate
 * @param targetLanguages - Target language(s) (e.g., 'es' or ['es', 'fr', 'de'])
 * @param options - Translation options
 * @returns Object with translations for each target language
 */
export declare function translateJSON(
  jsonData: any,
  targetLanguages: string | string[],
  options?: TranslateJSONOptions
): Promise<TranslationResult>;

export { 
  TranslateAPI, 
  TranslateCommand, 
  RecursiveTranslator,
  TranslateOptions,
  TranslateJSONOptions,
  TranslationResult
};

export default TranslateAPI;
