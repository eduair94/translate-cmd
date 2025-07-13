const { translateJSON, TranslateAPI } = require('../index');

// Test data with various array structures
const testData = {
  // Simple array of strings
  simpleArray: [
    "Welcome to our app",
    "Click here to continue", 
    "Thank you for visiting"
  ],
  
  // Mixed content with arrays and objects
  navigation: {
    items: [
      "Home",
      "About Us", 
      "Services",
      "Contact"
    ],
    buttons: [
      { text: "Get Started", type: "primary" },
      { text: "Learn More", type: "secondary" },
      { text: "Sign Up", type: "success" }
    ]
  },
  
  // Nested arrays
  categories: [
    {
      name: "Technology",
      subcategories: ["Web Development", "Mobile Apps", "AI & Machine Learning"]
    },
    {
      name: "Business", 
      subcategories: ["Marketing", "Sales", "Customer Service"]
    }
  ],
  
  // Complex nested structure
  sections: [
    {
      title: "Getting Started",
      description: "Learn the basics of our platform",
      steps: [
        "Create your account",
        "Complete your profile", 
        "Start exploring features"
      ],
      tips: {
        beginner: "Take your time to explore",
        advanced: "Check out our API documentation"
      }
    },
    {
      title: "Advanced Features", 
      description: "Unlock the full potential",
      steps: [
        "Set up integrations",
        "Configure automation",
        "Optimize your workflow"
      ],
      tips: {
        beginner: "Start with basic automation",
        advanced: "Use webhooks for real-time updates"
      }
    }
  ],

  // Pure array at root level - this should also work
  messages: [
    "Hello World",
    "Good morning", 
    "How are you today?",
    "See you later"
  ]
};

async function testArrayTranslation() {
  console.log('🚀 Testing Array Translation with tr-file API\n');
  console.log('='.repeat(60));
  
  try {
    const startTime = Date.now();
    
    // Test 1: Translate entire complex structure
    console.log('\n📝 Test 1: Complete structure translation');
    console.log('Input structure:');
    console.log(JSON.stringify(testData, null, 2));
    
    console.log('\n🔄 Translating to Spanish and French...');
    
    const translations = await translateJSON(testData, ['es', 'fr'], {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\n✅ Translation Results:');
    console.log(JSON.stringify(translations, null, 2));
    
    console.log('\n' + '='.repeat(60));
    
    // Test 2: Simple array translation  
    console.log('\n📝 Test 2: Simple array translation');
    const simpleArray = [
      "Good morning",
      "Good afternoon", 
      "Good evening",
      "Good night"
    ];
    
    console.log('Input array:', simpleArray);
    
    const simpleResult = await translateJSON(simpleArray, 'de', {
      verbose: true
    });
    
    console.log('\n✅ German translation:');
    console.log(JSON.stringify(simpleResult, null, 2));
    
    console.log('\n' + '='.repeat(60));
    
    // Test 3: Complex nested array with multiple languages
    console.log('\n📝 Test 3: Multi-language complex array');
    
    const complexArray = [
      {
        category: "Food & Dining",
        items: ["Breakfast", "Lunch", "Dinner", "Snacks"],
        descriptions: {
          breakfast: "Start your day right",
          lunch: "Midday fuel", 
          dinner: "Evening feast"
        }
      },
      {
        category: "Entertainment", 
        items: ["Movies", "Music", "Games", "Books"],
        descriptions: {
          movies: "Cinema experience",
          music: "Audio pleasure",
          games: "Interactive fun"
        }
      }
    ];
    
    console.log('Complex array input:');
    console.log(JSON.stringify(complexArray, null, 2));
    
    const complexResult = await translateJSON(complexArray, ['es', 'it', 'pt'], {
      sourceLanguage: 'en',
      verbose: true
    });
    
    console.log('\n✅ Multi-language results:');
    console.log(JSON.stringify(complexResult, null, 2));
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(60));
    console.log(`🎉 All array tests completed successfully in ${duration} seconds!`);
    
    // Test 4: Performance test with large array
    console.log('\n📝 Test 4: Performance test with large array');
    
    const largeArray = [];
    for (let i = 0; i < 50; i++) {
      largeArray.push(`Message ${i + 1}: This is a sample text for performance testing`);
    }
    
    console.log(`Testing with ${largeArray.length} items...`);
    
    const perfStart = Date.now();
    const largeResult = await translateJSON(largeArray, 'fr', {
      verbose: false
    });
    const perfEnd = Date.now();
    const perfDuration = ((perfEnd - perfStart) / 1000).toFixed(2);
    
    console.log(`✅ Large array translated in ${perfDuration} seconds`);
    console.log(`📊 Average: ${(perfDuration / largeArray.length * 1000).toFixed(1)}ms per item`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

async function testEdgeCases() {
  console.log('\n📝 Testing Edge Cases with Arrays\n');
  
  try {
    const translator = new TranslateAPI({
      verbose: true
    });
    
    // Edge case 1: Empty array
    console.log('Edge case 1: Empty array');
    const emptyResult = await translator.translateJSON([], 'es');
    console.log('Empty array result:', emptyResult);
    
    // Edge case 2: Array with mixed content (strings and non-strings)
    console.log('\nEdge case 2: Mixed content array');
    const mixedArray = [
      "Translate this",
      123,
      null,
      "Also translate this",
      { nested: "Nested text to translate" },
      true,
      "Final string"
    ];
    
    const mixedResult = await translator.translateJSON(mixedArray, 'es');
    console.log('Mixed array result:', JSON.stringify(mixedResult, null, 2));
    
    // Edge case 3: Deep nesting
    console.log('\nEdge case 3: Deeply nested arrays');
    const deepNested = [
      [
        ["Deep level 1", "Deep level 2"],
        ["Another deep 1", "Another deep 2"]
      ],
      {
        level1: [
          {
            level2: ["Very deep", "Super deep"]
          }
        ]
      }
    ];
    
    const deepResult = await translator.translateJSON(deepNested, 'fr');
    console.log('Deep nested result:', JSON.stringify(deepResult, null, 2));
    
  } catch (error) {
    console.error('❌ Edge case test failed:', error.message);
  }
}

// Run tests
async function runAllTests() {
  await testArrayTranslation();
  await testEdgeCases();
}

if (require.main === module) {
  runAllTests();
}

module.exports = { testArrayTranslation, testEdgeCases, runAllTests };
