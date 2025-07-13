const { translateJSON, TranslateAPI } = require('../index');

async function simpleArrayTest() {
  console.log('🧪 Simple Array Test\n');
  
  try {
    // Test 1: Simple array of strings
    console.log('Test 1: Simple string array');
    const simpleArray = [
      "Hello World",
      "Good morning", 
      "Thank you"
    ];
    
    console.log('Input:', JSON.stringify(simpleArray, null, 2));
    
    const result = await translateJSON(simpleArray, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result, null, 2));
    
    console.log('\n' + '='.repeat(40));
    
    // Test 2: Array with objects
    console.log('\nTest 2: Array with objects');
    const objectArray = [
      { message: "Welcome", type: "greeting" },
      { message: "Goodbye", type: "farewell" }
    ];
    
    console.log('Input:', JSON.stringify(objectArray, null, 2));
    
    const result2 = await translateJSON(objectArray, 'fr', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result2, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  simpleArrayTest();
}

module.exports = { simpleArrayTest };
