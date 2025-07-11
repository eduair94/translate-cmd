@echo off
REM Example batch file showing how to use tr_file with the provided API key
REM Make sure to keep your API key secure and don't commit it to version control

set API_KEY=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw

echo 🌍 Translating example JSON file...
echo Source: example/en.json
echo Target languages: Spanish, Japanese, Portuguese
echo.

REM Run the translation command
tr_file example/en.json es,ja,pt -k %API_KEY%

echo.
echo ✅ Translation completed!
echo Check the example/ folder for the generated files:
echo - es.json (Spanish)
echo - ja.json (Japanese)
echo - pt.json (Portuguese)

pause
