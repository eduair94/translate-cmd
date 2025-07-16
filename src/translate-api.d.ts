export interface TranslateOptions {
  /** Google Translate API key (optional - uses built-in key if not provided) */
  apiKey?: string;
  /** Source language code (e.g., 'en', 'es', 'fr') - auto-detected if not provided */
  sourceLanguage?: string;
  /** Delay between API requests in milliseconds (default: 50) */
  delay?: number;
  /** Show progress messages during translation (default: true) */
  verbose?: boolean;
}

export interface TranslateJSONOptions extends TranslateOptions {
  // Additional options for JSON translation
  // Note: Placeholders in curly braces {placeholder} are automatically protected from translation
  // Note: JSON structure is preserved - flat keys like "test.test" remain flat, nested objects remain nested
}

export interface StringPath {
  path: string;
  text: string;
}

export interface TranslationResult {
  [language: string]: any;
}

export interface PathPart {
  type: 'array' | 'object';
  key: string;
  index?: number;
}

export declare class TranslateAPI {
  constructor(options?: TranslateOptions);
  
  /**
   * Translate a JSON object to multiple target languages
   * Features:
   * - Preserves original JSON structure (flat keys remain flat, nested objects remain nested)
   * - Protects placeholders in curly braces from translation (e.g., {username}, {count})
   * - Maintains non-string values (numbers, booleans, null, etc.)
   * - Supports arrays and mixed data types
   * @param jsonData - The JSON object or array to translate
   * @param targetLanguages - Target language(s) (e.g., 'es' or ['es', 'fr', 'de'])
   * @param options - Additional options
   * @returns Object with translations for each target language
   */
  translateJSON(
    jsonData: any, 
    targetLanguages: string | string[], 
    options?: TranslateJSONOptions
  ): Promise<TranslationResult>;

  /**
   * Translate specific strings to a target language
   * @param strings - Array of strings to translate
   * @param targetLanguage - Target language code
   * @param sourceLanguage - Source language code (optional)
   * @returns Array of translated strings
   */
  translateStrings(
    strings: string[], 
    targetLanguage: string, 
    sourceLanguage?: string | null
  ): Promise<string[]>;

  /**
   * Detect the language of given text(s)
   * @param texts - Text(s) to analyze
   * @returns Detected language code
   */
  detectLanguage(texts: string | string[]): Promise<string>;

  /**
   * Extract translatable strings from an object or array
   * @param obj - The object or array to extract strings from
   * @param prefix - Path prefix for nested structures
   * @returns Array of string paths and texts
   */
  extractStrings(obj: any, prefix?: string): StringPath[];

  /**
   * Set a nested value in an object using a path
   * @param obj - The target object or array
   * @param path - The path to set (e.g., 'items[0].name' or '[1].title')
   * @param value - The value to set
   */
  setNestedValue(obj: any, path: string, value: any): void;

  /**
   * Parse a path string into path parts
   * @param path - The path to parse
   * @returns Array of path parts
   */
  parsePath(path: string): PathPart[];

  /**
   * Translate multiple texts in batches
   * @param texts - Array of texts to translate
   * @param targetLanguage - Target language code
   * @param sourceLanguage - Source language code (optional)
   * @returns Array of translated texts
   */
  batchTranslateTexts(
    texts: string[], 
    targetLanguage: string, 
    sourceLanguage?: string | null
  ): Promise<string[]>;

  /**
   * Translate a batch of texts using Google Translate API
   * @param texts - Array of texts to translate
   * @param targetLanguage - Target language code
   * @param sourceLanguage - Source language code (optional)
   * @returns Array of translated texts
   */
  translateBatch(
    texts: string[], 
    targetLanguage: string, 
    sourceLanguage?: string | null
  ): Promise<string[]>;

  /**
   * Sleep for a specified number of milliseconds
   * @param ms - Milliseconds to sleep
   */
  sleep(ms: number): Promise<void>;
}

/**
 * Convenience function to translate JSON objects
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

export { TranslateAPI as default };
