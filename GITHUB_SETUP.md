# GitHub Setup Instructions

## 🚀 Quick Setup

### 🌐 [Live Demo](https://tr-file.checkleaked.cc)

Test tr-file directly in your browser with our interactive demo! Upload JSON files or paste JSON content to see real-time translations.

### 1. Create GitHub Repository

Go to [GitHub](https://github.com) and create a new repository:

1. Click the "+" icon in the top right corner
2. Select "New repository"
3. Repository name: `tr-file`
4. Description: `A fast command-line tool for translating JSON files using Google Translate API`
5. Set to **Public** (so others can use it)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Push to GitHub

After creating the repository, run these commands:

```bash
# Add GitHub remote
git remote add origin https://github.com/airau/tr-file.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Set Up Repository Settings

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Features" section
4. Enable "Issues" and "Wiki" if desired
5. In "General" > "Social preview", add a description

### 4. Create a Release

1. Go to "Releases" tab
2. Click "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `tr-file v1.0.0 - Initial Release`
5. Describe the release:
   ```
   🎉 Initial release of tr-file CLI tool!
   
   ## Features
   - Translate JSON files using Google Translate API
   - Batch translation for speed
   - Recursive search in subdirectories
   - Incremental updates (preserves existing translations)
   - Progress tracking with visual indicators
   - Built-in API key for immediate use
   
   ## Installation
   ```
   npm install -g tr-file
   ```
   
   ## Usage
   ```
   tr_file en.json es,fr,de
   ```
   ```
6. Click "Publish release"

## 📦 NPM Package

Your package is already published on npm:
- **Package**: https://www.npmjs.com/package/tr-file
- **Version**: 1.0.0
- **Author**: eduair94

Users can install it with:
```bash
npm install -g tr-file
```

## 🎯 Next Steps

1. **Star your own repository** to boost visibility
2. **Share the package** on social media or dev communities
3. **Add topics** to your GitHub repo (json, i18n, translation, cli, etc.)
4. **Create issues** for future features or improvements
5. **Write documentation** or tutorials about usage

## 🤝 Community

Consider adding these to attract contributors:
- `CONTRIBUTING.md` ✅ (already created)
- `CODE_OF_CONDUCT.md` 
- Issue and PR templates
- GitHub Actions for CI/CD

Your package is now live and ready for the world! 🌍
