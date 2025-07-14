import { translateJSON, TranslateAPI, TranslateOptions, TranslationResult } from '../index';

// TypeScript example demonstrating type safety
async function typescriptExample(): Promise<void> {
  console.log('🚀 TypeScript Example with tr-file\n');

  try {
    // Example 1: Basic usage with type inference
    const sourceData = {
      welcome: "Welcome to our application",
      menu: {
        items: ["Home", "About", "Contact"],
        buttons: [
          { text: "Get Started", enabled: true },
          { text: "Learn More", enabled: false }
        ]
      },
      messages: [
        "Hello World",
        "Good morning",
        "Thank you for visiting"
      ]
    };

    console.log('📝 Example 1: Basic translation with TypeScript');
    console.log('Input:', JSON.stringify(sourceData, null, 2));

    // Type-safe function call
    const result: TranslationResult = await translateJSON(
      sourceData, 
      ['es', 'fr'], 
      {
        sourceLanguage: 'en',
        verbose: true
      }
    );

    console.log('\nResult:');
    console.log(JSON.stringify(result, null, 2));

    console.log('\n' + '='.repeat(50));

    // Example 2: Using TranslateAPI class with explicit types
    console.log('\n📝 Example 2: Using TranslateAPI class');

    const options: TranslateOptions = {
      sourceLanguage: 'en',
      delay: 50,
      verbose: true
    };

    const translator: TranslateAPI = new TranslateAPI(options);

    // Type-safe string array translation
    const strings: string[] = [
      "TypeScript is awesome",
      "Type safety rocks",
      "Compile-time error checking"
    ];

    console.log('Translating strings:', strings);

    const translations: string[] = await translator.translateStrings(strings, 'de');
    console.log('German translations:', translations);

    console.log('\n' + '='.repeat(50));

    // Example 3: Language detection with types
    console.log('\n📝 Example 3: Language detection');

    const unknownTexts: string[] = [
      'Hola, ¿cómo estás?',
      'Bonjour, comment allez-vous?'
    ];

    for (const text of unknownTexts) {
      const detectedLang: string = await translator.detectLanguage(text);
      console.log(`"${text}" → Detected: ${detectedLang}`);
    }

    console.log('\n' + '='.repeat(50));

    // Example 4: Complex array structure
    console.log('\n📝 Example 4: Complex array with TypeScript');

    interface Product {
      name: string;
      description: string;
      categories: string[];
      features: {
        title: string;
        benefits: string[];
      }[];
    }

    const products: Product[] = [
      {
        name: "Amazing Widget",
        description: "The best widget you'll ever use",
        categories: ["Productivity", "Tools", "Utilities"],
        features: [
          {
            title: "Easy to Use",
            benefits: ["Intuitive interface", "Quick setup", "No learning curve"]
          },
          {
            title: "Powerful Features",
            benefits: ["Advanced functionality", "Customizable options", "High performance"]
          }
        ]
      }
    ];

    console.log('Complex product data:');
    console.log(JSON.stringify(products, null, 2));

    const productTranslations: TranslationResult = await translateJSON(
      products,
      'es',
      { sourceLanguage: 'en', verbose: true }
    );

    console.log('\nSpanish translation:');
    console.log(JSON.stringify(productTranslations, null, 2));

  } catch (error) {
    console.error('❌ TypeScript example failed:', (error as Error).message);
  }
}

// Export for module use
export { typescriptExample };

// Run if called directly
if (require.main === module) {
  typescriptExample();
}
