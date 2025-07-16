# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2025-07-16

### Added
- **Live Demo**: Added interactive demo at https://tr-file.checkleaked.cc
- **Demo Documentation**: Updated all documentation files to include demo link
- **Enhanced Package Info**: Added demo field to package.json

### Changed
- **Documentation**: Updated README, API_USAGE, INSTALL, and PROJECT_SUMMARY with demo links
- **Demo README**: Enhanced demo documentation with live demo URL

## [1.3.0] - 2025-07-13

### Added
- **Full TypeScript Support**: Complete type definitions for all classes and functions
- **Array Translation**: Native support for JSON arrays and nested array structures
- **TypeScript Examples**: Comprehensive TypeScript usage examples with type safety
- **Enhanced Type Safety**: IntelliSense support and compile-time error checking
- **Complex Array Support**: Deep nested arrays, mixed content arrays, and array performance optimization

### Changed
- **Package Description**: Updated to highlight TypeScript and array support
- **Enhanced Documentation**: Added TypeScript usage examples in README
- **Improved Keywords**: Added TypeScript, arrays, and types keywords for better discoverability
- **File Exports**: Added `.d.ts` files to npm package exports

### Fixed
- **Array Path Handling**: Fixed complex nested array path parsing and value setting
- **Array Structure Preservation**: Arrays now maintain their structure perfectly during translation
- **Edge Cases**: Improved handling of empty arrays, mixed content, and deeply nested structures

### Performance
- **Array Translation Speed**: Optimized array processing for better performance
- **Type Definitions**: Zero runtime overhead with TypeScript support

## [1.2.0] - 2025-07-11

### Added
- **Automatic Language Detection**: Auto-detects source language from content
- **Source Language Option**: New `-s, --source-lang` flag to specify source language explicitly
- **Smart Language Filtering**: Automatically skips target languages that match the source language
- **Improved Performance**: Better translation accuracy with explicit source language specification
- **Enhanced CLI Help**: Updated help text and examples with new language detection features

### Fixed
- **Recursive Search Bug**: Fixed issue where recursive search was looking for full paths instead of filenames
- **Path Handling**: Improved path resolution for recursive file searches

### Changed
- **CLI Interface**: Added source language detection and filtering
- **Translation Logic**: Enhanced batch translation with source language support
- **API Calls**: More efficient translations with explicit source language specification
- **Automatic Language Detection**: Source language is now automatically detected if not specified
- **Source Language Option**: New `-s, --source-lang` option to explicitly specify source language
- **Smart Language Filtering**: Automatically skips target languages that match the source language
- **Improved Translation Accuracy**: Source language specification improves translation quality
- **GitHub Repository**: Package now properly linked to GitHub repository

### Changed
- Enhanced CLI with source language detection and filtering
- Updated progress messages to show source → target language translations
- Improved error handling for language detection failures

### Fixed
- Fixed package.json repository URL format for npm
- Updated all documentation with new language detection features

## [1.0.0] - 2025-07-11

### Added
- Initial release of tr-file CLI tool
- Batch translation for maximum performance
- Google Translate API integration with built-in API key
- Support for flat JSON keys with dot notation (e.g., "nav.home")
- Recursive file search across subdirectories
- Incremental translation (preserves existing translations)
- Smart deduplication to avoid redundant API calls
- Progress tracking with visual indicators
- Multiple language support in single command
- Rate limiting with configurable delays
- Comprehensive error handling
- Support for 100+ languages via Google Translate
- Built-in API key for immediate use
- MIT license

### Features
- **Batch Processing**: Translate up to 128 strings per API call
- **Smart Merging**: Only translates missing keys, preserves existing translations
- **Recursive Search**: Find and translate files in all subdirectories
- **Performance**: 100+ strings translated in under 2 seconds
- **Zero Setup**: Works immediately with built-in API key
- **Flexible**: Support for custom API keys and delays

### Supported Commands
- `tr_file en.json es,fr,de` - Basic translation
- `tr_file en.json es,fr,de --recursive` - Recursive translation
- `tr_file en.json es,fr,de -k YOUR_KEY` - Custom API key
- `tr_file en.json es,fr,de -d 100` - Custom delay

### Supported Languages
- Spanish (es), French (fr), German (de), Italian (it)
- Portuguese (pt), Japanese (ja), Korean (ko), Chinese (zh)
- Russian (ru), Arabic (ar), and 100+ more languages
