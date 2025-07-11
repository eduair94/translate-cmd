# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
