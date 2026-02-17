#!/bin/bash
# ============================================
# TypeScript → JavaScript Conversion Script
# Run from the project root after GitHub export
# Usage: bash scripts/convert-to-js.sh
# ============================================

set -e

echo "🔄 Starting TypeScript → JavaScript conversion..."

# Step 1: Install conversion tool
echo "📦 Installing ts-to-js dependencies..."
npm install -g typescript @anthropic-ai/sdk 2>/dev/null || true

# Step 2: Strip type annotations using a Node script
echo "🧹 Stripping TypeScript syntax..."

node -e "
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function walkDir(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
      results = results.concat(walkDir(filePath, ext));
    } else if (ext.some(e => file.endsWith(e))) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walkDir('src', ['.ts', '.tsx']);
let converted = 0;

files.forEach(filePath => {
  const source = fs.readFileSync(filePath, 'utf8');
  
  // Use TypeScript compiler to transpile (strips types, keeps logic)
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: false,
      esModuleInterop: true,
    },
    fileName: filePath,
  });

  // Determine new extension
  const newExt = filePath.endsWith('.tsx') ? '.jsx' : '.js';
  const newPath = filePath.replace(/\.tsx?$/, newExt);

  fs.writeFileSync(newPath, result.outputText);
  
  // Remove old TS file if the extension changed
  if (newPath !== filePath) {
    fs.unlinkSync(filePath);
  }
  
  converted++;
});

console.log('✅ Converted ' + converted + ' files');
"

# Step 3: Fix import paths (.ts/.tsx → .js/.jsx references)
echo "🔗 Fixing import paths..."
find src -name '*.js' -o -name '*.jsx' | while read file; do
  # Remove .ts/.tsx extensions from imports (Vite resolves without them)
  sed -i.bak "s/from '\(.*\)\.tsx'/from '\1'/g" "$file"
  sed -i.bak "s/from '\(.*\)\.ts'/from '\1'/g" "$file"
  sed -i.bak "s/from \"\(.*\)\.tsx\"/from \"\1\"/g" "$file"
  sed -i.bak "s/from \"\(.*\)\.ts\"/from \"\1\"/g" "$file"
  rm -f "$file.bak"
done

# Step 4: Convert config files
echo "⚙️ Converting config files..."

# tsconfig → jsconfig
if [ -f tsconfig.json ]; then
  node -e "
    const cfg = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
    delete cfg.compilerOptions.strict;
    delete cfg.compilerOptions.noEmit;
    delete cfg.compilerOptions.declaration;
    delete cfg.compilerOptions.declarationMap;
    cfg.compilerOptions.checkJs = false;
    cfg.include = (cfg.include || []).map(p => p.replace(/\.ts/, '.js'));
    require('fs').writeFileSync('jsconfig.json', JSON.stringify(cfg, null, 2));
  "
  echo "  ✅ Created jsconfig.json"
fi

# Update vite.config
if [ -f vite.config.ts ]; then
  cp vite.config.ts vite.config.js
  rm vite.config.ts
  echo "  ✅ Renamed vite.config.ts → vite.config.js"
fi

# Step 5: Clean up TS-only files
echo "🗑️ Cleaning up TypeScript artifacts..."
rm -f tsconfig.json tsconfig.app.json tsconfig.node.json
rm -f src/vite-env.d.ts

# Step 6: Update package.json (remove TS devDependencies)
echo "📝 Note: Manually remove these from package.json devDependencies:"
echo "   - typescript"
echo "   - @types/*"
echo "   - tsconfig-related packages"

echo ""
echo "✅ Conversion complete!"
echo ""
echo "Next steps:"
echo "  1. Run: npm install"
echo "  2. Remove TypeScript devDependencies from package.json"
echo "  3. Run: npm run dev (to verify everything works)"
echo "  4. Check for any remaining type-only imports and remove them"
