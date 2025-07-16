const { translateJSON } = require('../index');

async function debugConflictingPaths() {
  console.log('🔍 Debug Conflicting Paths Test\n');
  
  try {
    const testData = {
      "test.test": "Hello World with {username}",  // Flat key
      "test": {
        "test": "Nested test with {test} placeholder"  // Nested key
      }
    };
    
    console.log('Original structure:');
    console.log(JSON.stringify(testData, null, 2));
    
    // Let's manually check what paths are being generated
    const TranslateAPI = require('../src/translate-api');
    const api = new TranslateAPI();
    const strings = api.extractStrings(testData);
    
    console.log('\nExtracted strings and paths:');
    strings.forEach((s, i) => {
      console.log(`${i}: path="${s.path}", text="${s.text}", isFlatKey=${s.isFlatKey}`);
    });
    
    const result = await translateJSON(testData, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nTranslated structure:');
    console.log(JSON.stringify(result.es, null, 2));
    
    console.log('\nExpected vs Actual:');
    console.log(`Flat "test.test" should be: "Hello World with {username}" (translated)`);
    console.log(`Flat "test.test" actual is: "${result.es['test.test']}"`);
    console.log(`Nested test.test should be: "Nested test with {test} placeholder" (translated)`);
    console.log(`Nested test.test actual is: "${result.es.test?.test}"`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  debugConflictingPaths();
}

module.exports = { debugConflictingPaths };
