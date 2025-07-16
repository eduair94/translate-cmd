const { translateJSON, TranslateAPI } = require('../index');

async function mixedStructureTest() {
  console.log('🧪 Mixed Structure Test - Flat Keys vs Nested Objects with Placeholders\n');
  
  try {
    // Test: Mixed structure with flat keys, nested objects, and various placeholders
    console.log('Test: Mixed flat keys and nested objects with complex placeholders');
    
    const mixedData = {
      // Flat keys with dots - should remain as flat keys
      "test.test": "Hello World with {username}",
      "nav.home": "Home page for {year}",
      "user.profile.name": "Welcome {name}, you have {count} messages",
      "app.status.loading": "Loading {progress}% complete in {time} seconds",
      "message.greeting": "Hello {user.name}, your account {account.id} is active since {year}",
      
      // Nested objects - should remain nested
      "test": {
        "test": "Nested test with {test} placeholder",
        "welcome": "Welcome {username} to our {app.name} application!",
        "status": "Status: {status} - Last updated {timestamp}"
      },
      
      // More complex nested structure
      "navigation": {
        "menu": {
          "home": "Home with {donotbreak} parameter",
          "about": "About us page - Est. {year}",
          "contact": "Contact us: {email} or {phone}"
        },
        "breadcrumb": "You are here: {current.page} > {parent.page}"
      },
      
      // Array with placeholders
      "items": [
        "First item with {value} and {year}",
        "Second item with {test} and {donotbreak}",
        "Third item processing {items.processed} of {items.total}"
      ],
      
      // Mixed data types with placeholders
      "config": {
        "title": "App Config for {year}",
        "version": "1.0.0", // Non-string value
        "debug": true, // Non-string value
        "maxUsers": 100, // Non-string value
        "features": {
          "auth": "Authentication with {provider}",
          "notifications": "Send {count} notifications to {user.email}"
        }
      },
      
      // Edge cases
      "edge.cases": {
        "empty.placeholder": "Text with {} empty braces",
        "multiple.same": "User {user} logged in as {user} from {location}",
        "nested.braces": "Config: {app.config.theme} with {app.config.language}",
        "special.chars": "Price: ${price} for {item.name} (valid until {expiry.date})"
      }
    };
    
    console.log('Input (first 10 lines):');
    console.log(JSON.stringify(mixedData, null, 2).split('\n').slice(0, 10).join('\n') + '\n...');
    
    console.log('\n' + '='.repeat(60));
    
    // Test with Spanish translation
    console.log('\n🇪🇸 Translating to Spanish...');
    const spanishResult = await translateJSON(mixedData, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nSpanish Result:');
    console.log(JSON.stringify(spanishResult.es, null, 2));
    
    console.log('\n' + '='.repeat(60));
    
    // Test with French translation
    console.log('\n🇫🇷 Translating to French...');
    const frenchResult = await translateJSON(mixedData, 'fr', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nFrench Result:');
    console.log(JSON.stringify(frenchResult.fr, null, 2));
    
    console.log('\n' + '='.repeat(60));
    
    // Verification: Check structure preservation
    console.log('\n🔍 Structure Verification:');
    
    const original = mixedData;
    const translated = spanishResult.es;
    
    // Check flat keys
    const flatKeys = ['test.test', 'nav.home', 'user.profile.name', 'app.status.loading'];
    console.log('\nFlat Keys Verification:');
    flatKeys.forEach(key => {
      const hasOriginal = original.hasOwnProperty(key);
      const hasTranslated = translated.hasOwnProperty(key);
      console.log(`  ${key}: Original=${hasOriginal}, Translated=${hasTranslated} ✓`);
    });
    
    // Check nested structure
    console.log('\nNested Structure Verification:');
    console.log(`  test.test (nested): ${typeof translated.test?.test === 'string' ? '✓' : '✗'}`);
    console.log(`  navigation.menu.home: ${typeof translated.navigation?.menu?.home === 'string' ? '✓' : '✗'}`);
    console.log(`  config.version (string): ${typeof translated.config?.version === 'string' ? '✓' : '✗'} (value: ${translated.config?.version})`);
    console.log(`  config.debug (boolean): ${typeof translated.config?.debug === 'boolean' ? '✓' : '✗'} (value: ${translated.config?.debug})`);
    console.log(`  config.maxUsers (number): ${typeof translated.config?.maxUsers === 'number' ? '✓' : '✗'} (value: ${translated.config?.maxUsers})`);
    
    // Check placeholder preservation
    console.log('\nPlaceholder Preservation Check:');
    const checkPlaceholder = (text, placeholder) => {
      return text && text.includes(placeholder) ? '✓' : '✗';
    };
    
    console.log(`  {username} in test.test: ${checkPlaceholder(translated['test.test'], '{username}')} (text: "${translated['test.test']}")`);
    console.log(`  {year} in nav.home: ${checkPlaceholder(translated['nav.home'], '{year}')} (text: "${translated['nav.home']}")`);
    console.log(`  {test} in nested test.test: ${checkPlaceholder(translated.test?.test, '{test}')} (text: "${translated.test?.test}")`);
    console.log(`  {donotbreak} in menu.home: ${checkPlaceholder(translated.navigation?.menu?.home, '{donotbreak}')} (text: "${translated.navigation?.menu?.home}")`);
    console.log(`  {user.name} in message.greeting: ${checkPlaceholder(translated['message.greeting'], '{user.name}')} (text: "${translated['message.greeting']}")`);
    
    // Additional debugging for the flat key issue
    console.log('\nFlat Key Structure Debug:');
    console.log(`  "test.test" flat key value: "${translated['test.test']}"`);
    console.log(`  test.test nested value: "${translated.test?.test}"`);
    console.log(`  Are they different? ${translated['test.test'] !== translated.test?.test ? 'Yes' : 'No'}`);
    
    // Check edge.cases structure
    console.log('\nEdge Cases Structure:');
    console.log(`  edge.cases exists as flat key: ${translated.hasOwnProperty('edge.cases') ? '✓' : '✗'}`);
    console.log(`  edge exists as nested object: ${translated.hasOwnProperty('edge') ? '✗ (should not exist)' : '✓'}`);
    if (translated['edge.cases']) {
      console.log(`  edge.cases contains: ${Object.keys(translated['edge.cases']).join(', ')}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  mixedStructureTest();
}

module.exports = { mixedStructureTest };
