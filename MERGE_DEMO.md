# Merge Functionality Demo

This demonstrates how tr_file preserves existing translations while adding new ones.

## Step 1: Create initial English file
```json
{
  "app.title": "My App",
  "nav.home": "Home",
  "nav.about": "About"
}
```

## Step 2: Translate to Spanish
```bash
tr_file en.json es
```

**Result (es.json):**
```json
{
  "app.title": "Mi aplicación",
  "nav.home": "Inicio",
  "nav.about": "Acerca de"
}
```

## Step 3: Add new keys to English file
```json
{
  "app.title": "My App",
  "nav.home": "Home",
  "nav.about": "About",
  "nav.contact": "Contact",
  "message.welcome": "Welcome"
}
```

## Step 4: Run translation again
```bash
tr_file en.json es
```

**Result (es.json):**
```json
{
  "app.title": "Mi aplicación",      // ✅ PRESERVED
  "nav.home": "Inicio",              // ✅ PRESERVED
  "nav.about": "Acerca de",          // ✅ PRESERVED
  "nav.contact": "Contacto",         // ✅ NEW TRANSLATION
  "message.welcome": "Bienvenido"    // ✅ NEW TRANSLATION
}
```

## Benefits:

1. **No API waste**: Only translates missing keys
2. **Preserves manual edits**: Custom translations stay intact
3. **Incremental updates**: Add new features without retranslating everything
4. **Cost effective**: Reduces API usage significantly

## Console Output:
```
🌍 Starting translation process...
✓ Loaded source file: en.json
✓ Found 5 strings to translate (5 unique)
✔ ES translation completed → es.json (2 new, 3 existing)
🎉 Translation completed successfully!
```
