const { TranslateAPI } = require('../index');

async function debugArrays() {
  console.log('🧪 Debug Array Processing\n');
  
  try {
    const translator = new TranslateAPI({
      verbose: false
    });
    
    // Test the extractStrings method
    const testData = {
      items: ["Item 1", "Item 2"],
      nested: [
        { name: "Nested 1" },
        { name: "Nested 2" }
      ]
    };
    
    console.log('Input:', JSON.stringify(testData, null, 2));
    
    const strings = translator.extractStrings(testData);
    console.log('\nExtracted strings:');
    strings.forEach(s => {
      console.log(`  "${s.path}" -> "${s.text}"`);
    });
    
    // Test simple translation
    console.log('\n🔄 Testing simple translation...');
    const result = await translator.translateJSON(testData, 'es', {
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  debugArrays();
}

module.exports = { debugArrays };
