const path = require('path');

function resolveDirname( relativePath = '' ) {
  return path.resolve(__dirname, '../', relativePath);
}

function resolveRoot(relativePath = '') {
  return path.resolve(__dirname, '../../../', relativePath);
}

module.exports = {
  root: resolveDirname('.'),
  src: resolveDirname('src'),
  output: resolveDirname('dist'),
  entry: resolveDirname('src/index.tsx'),
  template: resolveRoot('assets/templates/template.html'),
  images: resolveRoot('assets/images'),
  assets: resolveRoot('assets'),
  configEnv: resolveRoot('config/.env'),
  configEnvExample: resolveRoot('config/.env.example'),
  tslintConfig: resolveDirname('tslint.json'),
  tsConfig: resolveDirname('tsconfig.json'),
  babelrc: resolveDirname('.babelrc'),
  types: resolveDirname('types')
};
