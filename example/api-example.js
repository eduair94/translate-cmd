const { translateJSON, TranslateAPI } = require('../index');

// Example JSON data
const sampleData = {
  "app": {
    "name": "My Amazing App",
    "description": "This is a wonderful application that helps users translate content"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact Us",
    "settings": "Settings"
  },
  "messages": {
    "welcome": "Welcome to our platform!",
    "goodbye": "Thank you for using our service",
    "error": "An error occurred while processing your request"
  }
};

async function demonstrateAPI() {
  console.log('🚀 Demonstrating tr-file API usage\n');
  
  try {
    // Example 1: Basic translation with convenience function
    console.log('📝 Example 1: Basic JSON translation');
    console.log('Input:', JSON.stringify(sampleData, null, 2));
    
    const basicTranslations = await translateJSON(sampleData, ['es', 'fr'], {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nTranslations:');
    console.log(JSON.stringify(basicTranslations, null, 2));
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Example 2: Using the TranslateAPI class directly
    console.log('📝 Example 2: Using TranslateAPI class');
    
    const translator = new TranslateAPI({
      sourceLanguage: 'en',
      delay: 50,
      verbose: true
    });
    
    // Translate specific strings
    const strings = ['Hello World', 'Good Morning', 'How are you?'];
    console.log('Translating strings:', strings);
    
    const spanishStrings = await translator.translateStrings(strings, 'es');
    console.log('Spanish translations:', spanishStrings);
    
    const frenchStrings = await translator.translateStrings(strings, 'fr');
    console.log('French translations:', frenchStrings);
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Example 3: Language detection
    console.log('📝 Example 3: Language detection');
    
    const unknownTexts = [
      'Bonjour, comment allez-vous?',
      'Hola, ¿cómo estás?',
      'Guten Tag, wie geht es Ihnen?'
    ];
    
    for (const text of unknownTexts) {
      const detectedLang = await translator.detectLanguage(text);
      console.log(`"${text}" → Detected language: ${detectedLang}`);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Example 4: Silent mode (no console output)
    console.log('📝 Example 4: Silent mode translation');
    
    const silentResult = await translateJSON({
      title: 'Silent Translation',
      message: 'This translation runs without console output'
    }, 'de', {
      verbose: false
    });
    
    console.log('Silent translation result:');
    console.log(JSON.stringify(silentResult, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the demonstration
if (require.main === module) {
  demonstrateAPI();
}

module.exports = { demonstrateAPI };
