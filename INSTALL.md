# Installation and Usage Guide

## Quick Start

1. **Install the package globally:**
   ```bash
   npm install -g tr-file
   ```

2. **Set up your Google Translate API key:**
   ```bash
   # Option 1: Set environment variable
   export GOOGLE_TRANSLATE_API_KEY="your-api-key-here"
   
   # Option 2: Use the -k flag with each command
   tr_file en.json es,ja,pt -k "your-api-key-here"
   ```

3. **Use the command:**
   ```bash
   tr_file en.json es,ja,pt
   ```

## Local Development

If you want to test locally before publishing:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Link the package globally:**
   ```bash
   npm link
   ```

3. **Test with the example:**
   ```bash
   tr_file example/en.json es,ja,pt -k "your-api-key"
   ```

## Publishing to npm

1. **Login to npm:**
   ```bash
   npm login
   ```

2. **Publish the package:**
   ```bash
   npm publish
   ```

## API Key Setup

To get your Google Translate API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Translate API
4. Go to "Credentials" and create a new API key
5. Restrict the API key to only the Translate API for security

## Example Usage

```bash
# Basic usage
tr_file en.json es,fr,de

# With API key
tr_file en.json es,fr,de -k "AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw"

# With custom delay (helpful for large files)
tr_file en.json es,fr,de -d 300

# Multiple languages
tr_file en.json es,fr,de,it,pt,ja,ko,zh,ru,ar
```
