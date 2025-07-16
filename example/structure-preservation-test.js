const { translateJSON, TranslateAPI } = require('../index');

async function structurePreservationTest() {
  console.log('🧪 Structure Preservation Test\n');
  
  try {
    // Test 1: Flat keys with dots should remain flat
    console.log('Test 1: Flat keys with dots');
    const flatKeyData = {
      "test.test": "Hello World",
      "navigation.home": "Home",
      "user.profile.name": "Welcome {name}!"
    };
    
    console.log('Input:', JSON.stringify(flatKeyData, null, 2));
    
    const result1 = await translateJSON(flatKeyData, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result1, null, 2));
    
    console.log('\n' + '='.repeat(50));
    
    // Test 2: Nested structure should remain nested
    console.log('\nTest 2: Nested structure');
    const nestedData = {
      "test": {
        "test": "Hello World",
        "greeting": "Welcome {username} to our app!"
      },
      "navigation": {
        "home": "Home",
        "about": "About Us"
      }
    };
    
    console.log('Input:', JSON.stringify(nestedData, null, 2));
    
    const result2 = await translateJSON(nestedData, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result2, null, 2));
    
    console.log('\n' + '='.repeat(50));
    
    // Test 3: Mixed structure with placeholders
    console.log('\nTest 3: Mixed structure with placeholders');
    const mixedData = {
      "flat.key": "You have {count} messages",
      "nested": {
        "welcome": "Hello {name}!",
        "status": "Status: {status}"
      },
      "array": [
        "First item with {value}",
        "Second item with {data}"
      ]
    };
    
    console.log('Input:', JSON.stringify(mixedData, null, 2));
    
    const result3 = await translateJSON(mixedData, 'fr', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result3, null, 2));
    
    console.log('\n' + '='.repeat(50));
    
    // Test 4: Complex placeholders
    console.log('\nTest 4: Complex placeholders');
    const complexData = {
      "message": "Hello {user.name}, you have {notifications.count} new notifications",
      "template": "Welcome to {app.name}! Your account {account.id} is ready.",
      "status": "Processing {items.processed} of {items.total} items"
    };
    
    console.log('Input:', JSON.stringify(complexData, null, 2));
    
    const result4 = await translateJSON(complexData, 'de', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result4, null, 2));
    
    console.log('\n' + '='.repeat(50));
    
    // Test 5: Non-string values preservation
    console.log('\nTest 5: Non-string values preservation');
    const mixedTypesData = {
      "string": "Hello World",
      "number": 42,
      "boolean": true,
      "null": null,
      "array": [1, "translate me", 3],
      "object": {
        "text": "Translate this",
        "value": 123
      }
    };
    
    console.log('Input:', JSON.stringify(mixedTypesData, null, 2));
    
    const result5 = await translateJSON(mixedTypesData, 'es', {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\nResult:');
    console.log(JSON.stringify(result5, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

if (require.main === module) {
  structurePreservationTest();
}

module.exports = { structurePreservationTest };
