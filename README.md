# tr-file

[![npm version](https://badge.fury.io/js/tr-file.svg)](https://badge.fury.io/js/tr-file)
[![GitHub license](https://img.shields.io/github/license/eduair94/translate-cmd.svg)](https://github.com/eduair94/translate-cmd/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/tr-file.svg)](https://www.npmjs.com/package/tr-file)
[![GitHub issues](https://img.shields.io/github/issues/eduair94/translate-cmd.svg)](https://github.com/eduair94/translate-cmd/issues)
[![GitHub stars](https://img.shields.io/github/stars/eduair94/translate-cmd.svg)](https://github.com/eduair94/translate-cmd/stargazers)

A fast command-line tool and TypeScript/JavaScript library for translating JSON files and arrays using Google Translate API. Perfect for i18n (internationalization) workflows with batch translation, recursive search, incremental updates, array support, and programmatic API.

## 🚀 [Try the Live Demo](https://tr-file.checkleaked.cc)

Test tr-file directly in your browser with our interactive demo! Upload JSON files or paste JSON content to see real-time translations.

## Installation

### CLI Tool (Global)
```bash
npm install -g tr-file
```

### Library (Project)
```bash
npm install tr-file
```

## Usage

### 🖥️ Command Line Interface

```bash
tr_file <source-file> <target-languages> [options]
```

### 📚 JavaScript Library

```javascript
const { translateJSON } = require('tr-file');

const translations = await translateJSON({
  "welcome": "Welcome to our app",
  "nav.home": "Home"
}, ['es', 'fr', 'de']);

console.log(translations.es); // Spanish translations
```

### 🏷️ TypeScript Support

Full TypeScript support with type definitions included:

```typescript
import { translateJSON, TranslateAPI, TranslationResult } from 'tr-file';

// Type-safe translation
const result: TranslationResult = await translateJSON({
  welcome: "Welcome to our app",
  items: ["Home", "About", "Contact"]
}, ['es', 'fr']);

// Using the API class with types
const translator = new TranslateAPI({
  sourceLanguage: 'en',
  verbose: true
});

const strings: string[] = await translator.translateStrings(
  ["Hello", "World"], 
  'es'
);
```

**[📖 Full API Documentation →](API_USAGE.md)**

### CLI Examples

```bash
# Translate en.json to Spanish, Japanese, and Portuguese (auto-detects source language)
tr_file en.json es,ja,pt

# Specify source language explicitly
tr_file myfile.json es,ja,pt --source-lang en

# With custom API key
tr_file en.json es,ja,pt -k YOUR_API_KEY

# With custom delay between requests
tr_file en.json es,ja,pt -d 200

# Recursive translation - find all 'en.json' files in subdirectories
tr_file en.json es,fr,de --recursive

# Recursive with explicit source language
tr_file content.json es,fr,de -r -s en
```

### Source Language Detection

By default, `tr-file` automatically detects the source language of your content. However, you can specify it explicitly:

```bash
# Auto-detect source language (default)
tr_file content.json es,fr,de

# Specify source language explicitly
tr_file content.json es,fr,de --source-lang en
tr_file content.json es,fr,de -s fr  # Short form
```

**Benefits of specifying source language:**
- Faster translation (skips detection step)
- More accurate translations
- Automatically filters out target languages that match the source

### Advanced Features

#### Placeholder Protection

Automatically protects content in curly braces `{placeholder}` from translation:

```bash
# Input: {"message": "Hello {username}, you have {count} notifications"}
# Output: {"message": "Hola {username}, tienes {count} notificaciones"}
tr_file messages.json es
```

**Example:**
```json
{
  "greeting": "Welcome {name}!",
  "status": "You have {count} messages",
  "complex": "Processing {items.processed} of {items.total} items"
}
```

Translates to (Spanish):
```json
{
  "greeting": "¡Bienvenido {name}!",
  "status": "Tienes {count} mensajes", 
  "complex": "Procesando {items.processed} de {items.total} elementos"
}
```

#### Structure Preservation

Maintains your exact JSON structure:

```json
{
  "flat.key": "Flat key with dots",
  "nested": {
    "key": "Nested key"
  },
  "array": ["Item 1", "Item 2"],
  "mixed": {
    "text": "Translate this",
    "number": 42,
    "boolean": true
  }
}
```

**Features:**
- Flat keys like `"test.test"` remain as flat keys
- Nested objects remain nested
- Arrays maintain their structure
- Non-string values (numbers, booleans, null) are preserved

### Recursive Translation

Search for and translate all files with a specific name in all subdirectories:

```bash
# Find all 'en.json' files recursively and translate them
tr_file en.json es,fr,de --recursive

# Short form with -r flag
tr_file en.json es,fr,de -r

# Recursive with explicit source language
tr_file content.json es,fr,de -r -s en
```

**Recursive Example:**
```
project/
├── frontend/
│   └── locales/
│       ├── en.json     ← Found and translated
│       ├── es.json     ← Generated
│       └── fr.json     ← Generated
├── backend/
│   └── i18n/
│       ├── en.json     ← Found and translated
│       ├── es.json     ← Generated
│       └── fr.json     ← Generated
└── mobile/
    └── lang/
        ├── en.json     ← Found and translated
        ├── es.json     ← Generated
        └── fr.json     ← Generated
```

### Options

- `-k, --key <key>`: Google Translate API key (optional - uses built-in key if not provided)
- `-s, --source-lang <lang>`: Source language code (e.g., en, es, fr) - auto-detected if not provided
- `-d, --delay <ms>`: Delay between requests in milliseconds (default: 50ms)
- `-r, --recursive`: Search for source file in all subdirectories

## Setup

**Quick Start**: The tool works immediately with a built-in API key - no setup required!

```bash
# Install and use right away
npm install -g tr-file
tr_file en.json es,ja,pt
```

**Optional - Use your own API key**:

1. Get a Google Translate API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Google Translate API
   - Create credentials and get your API key

2. Set your API key (choose one method):
   ```bash
   # Option 1: Environment variable
   export GOOGLE_TRANSLATE_API_KEY="your-api-key-here"
   
   # Option 2: Use the -k flag
   tr_file en.json es,ja,pt -k "your-api-key-here"
   ```

## Features

- ✅ **TypeScript Support**: Full type definitions and IntelliSense support
- ✅ **Array Translation**: Native support for JSON arrays and complex nested structures
- ✅ **Programmatic API**: Use as a library in your Node.js/TypeScript projects
- ✅ **Automatic Language Detection**: Detects source language automatically or accepts explicit specification
- ✅ **Smart Language Filtering**: Automatically skips target languages that match the source
- ✅ **Batch Translation**: Translates multiple strings in single API calls for maximum speed
- ✅ **Smart Deduplication**: Only translates unique strings, avoiding redundant API calls
- ✅ **Incremental Updates**: Only translates missing keys, preserves existing translations
- ✅ **Recursive Translation**: Find and translate files in all subdirectories
- ✅ **Preserves JSON Structure**: Maintains nested objects and arrays perfectly
- ✅ **Structure Preservation**: Keeps flat keys like `"test.test"` as flat keys, nested objects as nested
- ✅ **Placeholder Protection**: Automatically protects content in curly braces like `{username}` from translation
- ✅ **Mixed Data Types**: Preserves numbers, booleans, null values, and other non-string data
- ✅ **Progress Tracking**: Visual indicators with spinners and progress info
- ✅ **Multiple Languages**: Translate to multiple target languages in one command
- ✅ **Error Handling**: Graceful error handling and recovery
- ✅ **Rate Limiting**: Configurable delay between requests
- ✅ **Fast Performance**: Can translate 100+ strings in under 2 seconds
- ✅ **Built-in API Key**: Works out of the box without setup

## Input/Output Example

**Input (en.json):**
```json
{
  "greeting": "Hello",
  "navigation": {
    "home": "Home",
    "about": "About Us"
  },
  "messages": {
    "welcome": "Welcome to our app",
    "goodbye": "Thank you for visiting"
  }
}
```

**Output (es.json):**
```json
{
  "greeting": "Hola",
  "navigation": {
    "home": "Inicio",
    "about": "Acerca de nosotros"
  },
  "messages": {
    "welcome": "Bienvenido a nuestra aplicación",
    "goodbye": "Gracias por visitarnos"
  }
}
```

## Supported Languages

The tool supports all languages supported by Google Translate API. Common language codes include:

- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `ja` - Japanese
- `ko` - Korean
- `zh` - Chinese
- `ru` - Russian
- `ar` - Arabic

## Incremental Translation

The tool intelligently handles existing translation files:

- **Preserves Existing Translations**: Never overwrites existing translations
- **Only Adds Missing Keys**: Translates only keys that don't exist in the target file
- **Merge Functionality**: Combines new translations with existing ones
- **No Redundant API Calls**: Skips translation if all keys already exist

**Example:**
```bash
# First run - translates all keys
tr_file en.json es  # Creates es.json with all translations

# Add new keys to en.json
echo '{"new.key": "New text"}' >> en.json

# Second run - only translates new keys
tr_file en.json es  # Only translates "new.key", preserves existing translations
```

## Performance

The tool uses **batch translation** for maximum efficiency:

- **Smart Deduplication**: Only translates unique strings, avoiding redundant API calls
- **Batch Processing**: Groups multiple strings into single API requests (up to 128 strings per batch)
- **Parallel Language Processing**: Translates to multiple languages concurrently
- **Optimized Rate Limiting**: Minimal delays between requests while respecting API limits

**Example Performance:**
- 100 strings → 3 languages = 300 translations in ~1.3 seconds
- Small files (10-20 strings) complete in under 1 second
- Large files (100+ strings) complete in 1-3 seconds per language

## Rate Limiting

The tool includes built-in rate limiting to avoid hitting Google Translate API limits. You can adjust the delay between requests using the `-d` option.

## Error Handling

- If a translation fails, the original text is preserved
- Network errors are handled gracefully
- Invalid JSON files are detected and reported
- Missing API keys are reported with helpful messages

## License

MIT
