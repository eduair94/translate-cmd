# Recursive Translation Demo

This demonstrates the powerful recursive translation feature of tr-file.

## Directory Structure Before Translation

```
my-project/
├── frontend/
│   └── locales/
│       └── en.json         ← Source file
├── backend/
│   └── i18n/
│       └── en.json         ← Source file
├── mobile-app/
│   └── lang/
│       └── en.json         ← Source file
└── docs/
    └── translations/
        └── en.json         ← Source file
```

## Command

```bash
# Search for all en.json files and translate to Spanish, French, and German
tr_file en.json es,fr,de --recursive
```

## Results

The tool will:

1. **🔍 Search**: Find all `en.json` files in subdirectories
2. **📍 Report**: List all found files with their paths
3. **🌍 Translate**: Process each file individually
4. **💾 Save**: Create translation files in the same directories

## Directory Structure After Translation

```
my-project/
├── frontend/
│   └── locales/
│       ├── en.json         ← Original
│       ├── es.json         ← ✅ Generated
│       ├── fr.json         ← ✅ Generated
│       └── de.json         ← ✅ Generated
├── backend/
│   └── i18n/
│       ├── en.json         ← Original
│       ├── es.json         ← ✅ Generated
│       ├── fr.json         ← ✅ Generated
│       └── de.json         ← ✅ Generated
├── mobile-app/
│   └── lang/
│       ├── en.json         ← Original
│       ├── es.json         ← ✅ Generated
│       ├── fr.json         ← ✅ Generated
│       └── de.json         ← ✅ Generated
└── docs/
    └── translations/
        ├── en.json         ← Original
        ├── es.json         ← ✅ Generated
        ├── fr.json         ← ✅ Generated
        └── de.json         ← ✅ Generated
```

## Console Output Example

```
🔍 Searching for 'en.json' files recursively...
✓ Found 4 file(s):
  📄 frontend/locales/en.json
  📄 backend/i18n/en.json
  📄 mobile-app/lang/en.json
  📄 docs/translations/en.json

📁 Processing: frontend/locales/en.json (1/4)
🌍 Starting translation process...
✓ Loaded source file: en.json
✓ Found 25 strings to translate (23 unique)
✔ ES translation completed → es.json (25 new, 0 existing)
✔ FR translation completed → fr.json (25 new, 0 existing)
✔ DE translation completed → de.json (25 new, 0 existing)
🎉 Translation completed successfully!

📁 Processing: backend/i18n/en.json (2/4)
... (continues for each file)

🎉 Recursive translation completed! Processed 4 file(s).
```

## Benefits

- **🚀 Batch Processing**: Translate entire projects at once
- **📁 Organized**: Files stay in their original directories
- **🔄 Incremental**: Only translates new/missing keys
- **⏱️ Time Saving**: No need to navigate to each directory
- **🎯 Selective**: Choose exactly which files to translate

## Smart Directory Filtering

The tool automatically skips common directories:
- `node_modules/`
- `.git/`
- `dist/`, `build/`
- `.next/`, `.nuxt/`
- `coverage/`
- And other development directories

## Use Cases

Perfect for:
- **Monorepos**: Multiple apps with separate translation files
- **Microservices**: Each service has its own i18n files
- **Component Libraries**: Translations scattered across components
- **Documentation**: Multiple language versions of docs
- **Theme Systems**: Different themes with separate translations
