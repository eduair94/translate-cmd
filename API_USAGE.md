# API Usage Examples

## 🚀 [Try the Live Demo](https://tr-file.checkleaked.cc)

Test tr-file directly in your browser with our interactive demo! Upload JSON files or paste JSON content to see real-time translations.

## Import the Library

```javascript
// ES6 modules
import { translateJSON, translateStrings, TranslateAPI } from 'tr-file';

// CommonJS
const { translateJSON, translateStrings, TranslateAPI } = require('tr-file');
```

## Quick Start - Translate JSON Object

```javascript
const { translateJSON } = require('tr-file');

const myData = {
  "welcome": "Welcome to our app",
  "nav": {
    "home": "Home",
    "about": "About Us"
  }
};

// Translate to multiple languages
const translations = await translateJSON(myData, ['es', 'fr', 'de']);

console.log(translations);
// Output:
// {
//   "es": {
//     "welcome": "Bienvenido a nuestra aplicación",
//     "nav.home": "Inicio",
//     "nav.about": "Acerca de nosotros"
//   },
//   "fr": {
//     "welcome": "Bienvenue dans notre application",
//     "nav.home": "Accueil",
//     "nav.about": "À propos de nous"
//   },
//   "de": {
//     "welcome": "Willkommen in unserer App",
//     "nav.home": "Startseite",
//     "nav.about": "Über uns"
//   }
// }
```

## Advanced Usage with Options

```javascript
const { TranslateAPI } = require('tr-file');

const translator = new TranslateAPI({
  apiKey: 'your-api-key', // Optional - uses built-in key if not provided
  sourceLanguage: 'en',   // Optional - auto-detects if not specified
  delay: 100,             // Optional - delay between API calls in ms
  verbose: true           // Optional - show progress messages
});

const result = await translator.translateJSON(myData, ['es', 'fr']);
```

## Translate Individual Strings

```javascript
const { TranslateAPI } = require('tr-file');

const translator = new TranslateAPI();

// Translate an array of strings
const strings = ['Hello', 'Goodbye', 'Thank you'];
const translated = await translator.translateStrings(strings, 'es');
console.log(translated); // ['Hola', 'Adiós', 'Gracias']

// Translate a single string
const singleTranslation = await translator.translateStrings(['Hello'], 'fr');
console.log(singleTranslation); // ['Bonjour']
```

## Language Detection

```javascript
const { TranslateAPI } = require('tr-file');

const translator = new TranslateAPI();

// Detect language of text
const language = await translator.detectLanguage('Bonjour, comment allez-vous?');
console.log(language); // 'fr'

// Detect language of multiple texts
const texts = ['Hello world', 'How are you?'];
const detectedLang = await translator.detectLanguage(texts);
console.log(detectedLang); // 'en'
```

## Integration Examples

### Express.js API Endpoint

```javascript
const express = require('express');
const { translateJSON } = require('tr-file');

const app = express();
app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { data, languages } = req.body;
    const translations = await translateJSON(data, languages, {
      verbose: false // Disable console output in API
    });
    res.json({ success: true, translations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### React Component

```javascript
import React, { useState } from 'react';
import { translateJSON } from 'tr-file';

function TranslationComponent() {
  const [translations, setTranslations] = useState({});
  
  const handleTranslate = async () => {
    const data = {
      title: 'My App',
      description: 'This is a great application'
    };
    
    const result = await translateJSON(data, ['es', 'fr'], {
      verbose: false
    });
    
    setTranslations(result);
  };

  return (
    <div>
      <button onClick={handleTranslate}>Translate</button>
      <pre>{JSON.stringify(translations, null, 2)}</pre>
    </div>
  );
}
```

### Build Tool Integration

```javascript
// webpack.config.js or similar build script
const { translateJSON } = require('tr-file');
const fs = require('fs');

async function generateTranslations() {
  const sourceData = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
  
  const translations = await translateJSON(sourceData, ['es', 'fr', 'de', 'it'], {
    sourceLanguage: 'en',
    verbose: true
  });
  
  // Save each translation to separate files
  for (const [lang, data] of Object.entries(translations)) {
    fs.writeFileSync(`src/locales/${lang}.json`, JSON.stringify(data, null, 2));
  }
}

// Run during build process
generateTranslations().catch(console.error);
```

## API Reference

### `translateJSON(jsonData, targetLanguages, options)`
- **jsonData** (Object): JSON object to translate
- **targetLanguages** (string|Array): Target language code(s)
- **options** (Object): Configuration options
  - `apiKey` (string): Google Translate API key
  - `sourceLanguage` (string): Source language code (auto-detected if not provided)
  - `delay` (number): Delay between API calls in milliseconds (default: 50)
  - `verbose` (boolean): Show progress messages (default: true)

### `TranslateAPI` Class Methods
- **`translateJSON(jsonData, targetLanguages, options)`**: Translate entire JSON object
- **`translateStrings(strings, targetLanguage, sourceLanguage)`**: Translate array of strings
- **`detectLanguage(texts)`**: Detect language of text(s)

## Error Handling

```javascript
try {
  const translations = await translateJSON(myData, ['es', 'fr']);
  console.log('Success:', translations);
} catch (error) {
  if (error.message.includes('API Error')) {
    console.error('Translation API error:', error.message);
  } else if (error.message.includes('Network error')) {
    console.error('Network problem:', error.message);
  } else {
    console.error('Other error:', error.message);
  }
}
```
