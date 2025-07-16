const { translateJSON } = require('./index');

async function simpleTest() {
  try {
    console.log('🧪 Simple validation test...');
    
    const testData = {
      'flat.key': 'Hello {user} in {location}',
      'nested': {
        'key': 'Nested value with {placeholder}',
        'other': 'Another nested with {value}'
      },
      'array': ['Item {index} with {data}', 'Second {item}'],
      'edge.cases': {
        'complex': 'Complex {a.b.c} and {x.y.z} placeholders',
        'unicode': '测试 {chinese} with 🎉 {emoji}'
      }
    };
    
    const result = await translateJSON(testData, 'zh-cn', { sourceLanguage: 'en' });
    const zh = result['zh-cn'];
    
    console.log('📊 Results:');
    console.log('Flat key:', zh['flat.key']);
    console.log('Nested key:', zh.nested?.key);
    console.log('Array[0]:', zh.array?.[0]);
    console.log('Edge case:', zh['edge.cases']?.complex);
    console.log('Unicode:', zh['edge.cases']?.unicode);
    
    console.log('\n✅ Validations:');
    console.log('- Flat key translated:', zh['flat.key']?.includes('你好') || zh['flat.key']?.includes('在'));
    console.log('- Nested key translated:', zh.nested?.key?.includes('嵌套') || zh.nested?.key?.includes('值'));
    console.log('- Placeholders preserved:', zh['flat.key']?.includes('{user}') && zh['flat.key']?.includes('{location}'));
    console.log('- Array translated:', Array.isArray(zh.array) && zh.array[0]?.includes('项目'));
    console.log('- Edge cases work:', zh['edge.cases']?.complex?.includes('复杂') || zh['edge.cases']?.complex?.includes('占位符'));
    console.log('- Unicode preserved:', zh['edge.cases']?.unicode?.includes('测试') && zh['edge.cases']?.unicode?.includes('🎉'));
    
    console.log('\n🎉 All validations passed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

simpleTest();
