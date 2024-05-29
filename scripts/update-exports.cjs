const fs = require('fs')
const path = require('path')
const { globSync } = require('glob')

const packageJsonPath = path.resolve(__dirname, '../package.json')
const distDir = path.resolve(__dirname, '../dist')

const packageJson = require(packageJsonPath)
const files = globSync(path.join(distDir, '/**/*.js'))

packageJson.exports = {}

files.forEach((file) => {
  const dirSplited = path.relative(distDir, file).split('/')
  const fileName = path.basename(file, '.js')

  if (dirSplited.length === 1) {
    const alias = fileName === 'index' ? '.' : `./${fileName}`

    packageJson.exports[alias] = {
      types: `./dist/${fileName}.d.ts`,
      import: `./dist/${fileName}.js`,
      default: `./dist/${fileName}.js`,
    }
  } else {
    if (fileName === 'index') {
      packageJson.exports['./*'] = {
        types: './dist/*/index.d.ts',
        import: './dist/*/index.js',
        default: './dist/*/index.js',
      }
    } else {
      packageJson.exports[`./${dirSplited[0]}/*`] = {
        types: `./dist/${dirSplited[0]}/*.d.ts`,
        import: `./dist/${dirSplited[0]}/*.js`,
        default: `./dist/${dirSplited[0]}/*.js`,
      }
    }
  }
})

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
