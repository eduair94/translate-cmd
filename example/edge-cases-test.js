const { translateJSON } = require('../index');

async function edgeCasesTest() {
  console.log('🔍 Edge Cases Structure Test\n');
  
  try {
    // Test specifically the edge.cases issue
    const testData = {
      "edge.cases": {
        "empty.placeholder": "Text with {} empty braces",
        "multiple.same": "User {user} logged in as {user} from {location}",
        "nested.braces": "Config: {app.config.theme} with {app.config.language}",
        "special.chars": "Price: ${price} for {item.name} (valid until {expiry.date})"
      }
    };
    
    console.log('Original structure:');
    console.log(JSON.stringify(testData, null, 2));
    
    const result = await translateJSON(testData, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nTranslated structure:');
    console.log(JSON.stringify(result.es, null, 2));
    
    // Check if edge.cases is preserved as flat key
    const hasEdgeCasesFlat = result.es.hasOwnProperty('edge.cases');
    const hasEdgeNested = result.es.hasOwnProperty('edge');
    
    console.log('\nStructure Analysis:');
    console.log(`Has "edge.cases" as flat key: ${hasEdgeCasesFlat ? '✓' : '✗'}`);
    console.log(`Has "edge" as nested object: ${hasEdgeNested ? '✗ (should not exist)' : '✓'}`);
    
    if (hasEdgeCasesFlat) {
      console.log('✅ Structure preserved correctly!');
    } else {
      console.log('❌ Structure not preserved correctly!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  edgeCasesTest();
}

module.exports = { edgeCasesTest };
