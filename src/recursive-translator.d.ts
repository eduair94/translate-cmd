export interface RecursiveTranslatorOptions {
  filename: string;
  targetLanguages: string[];
  sourceLanguage?: string;
  apiKey?: string;
  delay?: number;
}

export declare class RecursiveTranslator {
  constructor(options: RecursiveTranslatorOptions);
  
  /**
   * Execute recursive translation across multiple directories
   */
  execute(): Promise<void>;

  /**
   * Find files recursively in a directory
   * @param dir - Directory to search in
   * @param filename - Filename pattern to search for
   * @returns Array of found file paths
   */
  findFilesRecursively(dir: string, filename: string): Promise<string[]>;
}
