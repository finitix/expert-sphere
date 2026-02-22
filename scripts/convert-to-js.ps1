# ============================================
# TypeScript → JavaScript Conversion Script
# Run from the project root after GitHub export
# Usage: powershell -ExecutionPolicy Bypass -File scripts/convert-to-js.ps1
# ============================================

$ErrorActionPreference = "Stop"

Write-Host "🔄 Starting TypeScript → JavaScript conversion..."

# Step 1: Install conversion tool
Write-Host "📦 Installing ts-to-js dependencies..."
npm install -g typescript @anthropic-ai/sdk 2>$null || $true

# Step 2: Strip type annotations using a Node script
Write-Host "🧹 Stripping TypeScript syntax..."

node -e @"
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
"@

# Step 3: Fix import paths (.ts/.tsx → .js/.jsx references)
Write-Host "🔗 Fixing import paths..."
Get-ChildItem -Path "src" -Recurse -Include "*.js","*.jsx" | ForEach-Object {
    $file = $_.FullName
    # Remove .ts/.tsx extensions from imports (Vite resolves without them)
    (Get-Content $file) -replace "from '(.*)\.tsx'", "from '`$1'" | Set-Content $file
    (Get-Content $file) -replace "from '(.*)\.ts'", "from '`$1'" | Set-Content $file
    (Get-Content $file) -replace 'from "(.*)\.tsx"', 'from "`$1"' | Set-Content $file
    (Get-Content $file) -replace 'from "(.*)\.ts"', 'from "`$1"' | Set-Content $file
}

# Step 4: Convert config files
Write-Host "⚙️ Converting config files..."

# tsconfig → jsconfig
if (Test-Path "tsconfig.json") {
    node -e @"
    const cfg = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
    delete cfg.compilerOptions.strict;
    delete cfg.compilerOptions.noEmit;
    delete cfg.compilerOptions.declaration;
    delete cfg.compilerOptions.declarationMap;
    cfg.compilerOptions.checkJs = false;
    cfg.include = (cfg.include || []).map(p => p.replace(/\.ts/, '.js'));
    require('fs').writeFileSync('jsconfig.json', JSON.stringify(cfg, null, 2));
    "@
    Write-Host "  ✅ Created jsconfig.json"
}

# Update vite.config
if (Test-Path "vite.config.ts") {
    Copy-Item "vite.config.ts" "vite.config.js"
    Remove-Item "vite.config.ts"
    Write-Host "  ✅ Renamed vite.config.ts → vite.config.js"
}

# Step 5: Clean up TS-only files
Write-Host "🗑️ Cleaning up TypeScript artifacts..."
Remove-Item -Force "tsconfig.json","tsconfig.app.json","tsconfig.node.json" -ErrorAction SilentlyContinue
Remove-Item -Force "src/vite-env.d.ts" -ErrorAction SilentlyContinue

# Step 6: Update package.json (remove TS devDependencies)
Write-Host "📝 Note: Manually remove these from package.json devDependencies:"
Write-Host "   - typescript"
Write-Host "   - @types/*"
Write-Host "   - tsconfig-related packages"

Write-Host ""
Write-Host "✅ Conversion complete!"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Run: npm install"
Write-Host "  2. Remove TypeScript devDependencies from package.json"
Write-Host "  3. Run: npm run dev (to verify everything works)"
Write-Host "  4. Check for any remaining type-only imports and remove them"
