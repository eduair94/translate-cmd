# Publishing Guide for tr-file

## � [Try the Live Demo](https://tr-file.checkleaked.cc)

Test tr-file directly in your browser with our interactive demo! Upload JSON files or paste JSON content to see real-time translations.

## �📦 NPM Publishing

### Prerequisites

1. **Create an npm account**: Go to [npmjs.com](https://www.npmjs.com/) and sign up
2. **Verify your email**: Check your email and verify your npm account
3. **Login locally**: Run `npm login` and enter your credentials

### Pre-Publishing Checklist

- [ ] Update version in `package.json` if needed
- [ ] Update `CHANGELOG.md` with new features
- [ ] Test the package locally: `npm link` and test commands
- [ ] Ensure all files are included in the `files` field of `package.json`
- [ ] Check `.npmignore` to exclude unnecessary files
- [ ] Update author information in `package.json`

### Publishing Steps

```bash
# 1. Ensure you're in the project directory
cd path/to/tr-file

# 2. Install dependencies
npm install

# 3. Test the package
npm link
tr_file --help
tr_file example/en.json es,fr  # Test with sample data

# 4. Check what will be published
npm pack --dry-run

# 5. Login to npm (if not already logged in)
npm login

# 6. Publish to npm
npm publish

# 7. Verify publication
npm view tr-file
```

### After Publishing

- Visit [npmjs.com/package/tr-file](https://npmjs.com/package/tr-file) to see your package
- Test installation: `npm install -g tr-file`
- Share with the community!

## 🐙 GitHub Publishing

### 1. Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it `tr-file`
3. Don't initialize with README (we already have one)
4. Copy the repository URL

### 2. Initialize Git and Push

```bash
# Navigate to your project directory
cd path/to/tr-file

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial release of tr-file v1.0.0

Features:
- Batch translation with Google Translate API
- Recursive file search across subdirectories  
- Incremental updates preserving existing translations
- Smart deduplication and rate limiting
- Built-in API key for zero-setup usage
- Support for 100+ languages"

# Add GitHub remote (replace with your username/repo)
git remote add origin https://github.com/yourusername/tr-file.git

# Push to GitHub
git push -u origin main
```

### 3. Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `tr-file v1.0.0 - Initial Release`
5. Description:
```markdown
🎉 **Initial release of tr-file!**

A fast, intelligent command-line tool for translating JSON files using Google Translate API.

## ✨ Key Features

- **🚀 Batch Translation**: Up to 128 strings per API call
- **🔍 Recursive Search**: Find files in all subdirectories
- **📝 Incremental Updates**: Only translate missing keys
- **⚡ High Performance**: 100+ strings in under 2 seconds
- **🔑 Built-in API Key**: Works immediately, no setup required
- **🌍 100+ Languages**: Support for all Google Translate languages

## 📥 Installation

```bash
npm install -g tr-file
```

## 🚀 Quick Start

```bash
# Basic usage
tr_file en.json es,fr,de

# Recursive translation
tr_file en.json es,fr,de --recursive
```

## 📖 Full Documentation

See the [README](https://github.com/yourusername/tr-file#readme) for complete documentation and examples.
```

6. Check "Set as the latest release"
7. Click "Publish release"

### 4. Update Package.json URLs

After creating the GitHub repository, update the URLs in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/tr-file.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/tr-file/issues"
  },
  "homepage": "https://github.com/yourusername/tr-file#readme"
}
```

## 🏷️ Version Management

### Semantic Versioning

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Updating Versions

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major

# Then publish
npm publish
```

## 📈 Post-Launch

### Promote Your Package

- Share on social media
- Post in relevant communities (Reddit, Discord, etc.)
- Write a blog post about the tool
- Submit to awesome lists
- Ask for feedback and reviews

### Monitor and Maintain

- Monitor npm download stats
- Respond to GitHub issues
- Update dependencies regularly
- Add new features based on user feedback

## 🔧 Troubleshooting

### Common Issues

**npm publish fails with "package already exists"**
- The package name is taken
- Change the name in `package.json`

**Permission denied**
- Run `npm login` to authenticate
- Check if you're logged in: `npm whoami`

**Files missing from published package**
- Check the `files` field in `package.json`
- Review `.npmignore` settings

## 📞 Need Help?

- [npm documentation](https://docs.npmjs.com/)
- [GitHub documentation](https://docs.github.com/)
- [Semantic Versioning guide](https://semver.org/)
