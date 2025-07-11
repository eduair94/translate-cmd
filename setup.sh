#!/bin/bash
# Quick setup script for tr-file package

echo "🚀 Setting up tr-file for publishing..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the tr-file directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Link for local testing
echo "🔗 Linking package for local testing..."
npm link

# Test the CLI
echo "🧪 Testing CLI..."
tr_file --help

echo ""
echo "✅ Setup complete! Next steps:"
echo ""
echo "📝 Before publishing:"
echo "   1. Update author info in package.json"
echo "   2. Create GitHub repository"
echo "   3. Update repository URLs in package.json"
echo ""
echo "🌐 To publish to npm:"
echo "   npm login"
echo "   npm publish"
echo ""
echo "🐙 To publish to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial release'"
echo "   git remote add origin https://github.com/yourusername/tr-file.git"
echo "   git push -u origin main"
echo ""
echo "📖 See PUBLISHING.md for detailed instructions!"
