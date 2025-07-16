const { translateJSON } = require('../index');

async function debugStructureTest() {
  console.log('🔍 Debug Structure Test\n');
  
  try {
    const testData = {
      "edge.cases": {
        "empty.placeholder": "Text with {} empty braces"
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
      console.log(`${i}: path="${s.path}", text="${s.text}"`);
    });
    
    const result = await translateJSON(testData, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nTranslated structure:');
    console.log(JSON.stringify(result.es, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  debugStructureTest();
}

module.exports = { debugStructureTest };
