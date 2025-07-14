export interface CLIOptions {
  sourceFile: string;
  targetLanguages: string[];
  sourceLanguage?: string;
  apiKey?: string;
  delay?: number;
}

export declare class TranslateCommand {
  constructor(options: CLIOptions);
  
  /**
   * Execute the translation command
   */
  execute(): Promise<void>;

  /**
   * Load and parse a source JSON file
   * @returns Parsed JSON data
   */
  loadSourceFile(): Promise<any>;

  /**
   * Extract translatable strings from JSON data
   * @param obj - The JSON object to extract strings from
   * @param prefix - Path prefix for nested structures
   * @returns Array of string paths and texts
   */
  extractStrings(obj: any, prefix?: string): Array<{path: string, text: string}>;

  /**
   * Translate to a specific language
   * @param sourceData - The source JSON data
   * @param strings - Array of extracted strings
   * @param targetLanguage - Target language code
   * @param sourceLanguage - Source language code
   */
  translateToLanguage(
    sourceData: any, 
    strings: Array<{path: string, text: string}>, 
    targetLanguage: string, 
    sourceLanguage: string
  ): Promise<void>;

  /**
   * Detect the language of given texts
   * @param texts - Array of texts to analyze
   * @returns Detected language code
   */
  detectLanguage(texts: string[]): Promise<string>;

  /**
   * Get the output file path for a target language
   * @param language - Target language code
   * @returns Output file path
   */
  getOutputFilePath(language: string): string;
}

export interface RecursiveOptions {
  filename: string;
  targetLanguages: string[];
  sourceLanguage?: string;
  apiKey?: string;
  delay?: number;
}

export declare class RecursiveTranslator {
  constructor(options: RecursiveOptions);
  
  /**
   * Execute recursive translation
   */
  execute(): Promise<void>;

  /**
   * Find files recursively in a directory
   * @param dir - Directory to search in
   * @param filename - Filename to search for
   * @returns Array of found file paths
   */
  findFilesRecursively(dir: string, filename: string): Promise<string[]>;
}
