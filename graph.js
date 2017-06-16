const madge = require('madge');
const glob = require('glob');

const args = process.argv;
let i = 2;
next = () => args[i++];

// Example usage example:
// > ./graph.js '../web/app/client/**/*.spec.js*' '../web/webpack.config.js' '../web/app/client/'

const pattern       = next() || '**/*.js*';
const webpackConfig = next() || './webpack.config.js';
const baseDir       = next() || '.';
const imageType     = next() || 'svg';
const outPath       = next() || './generated/output';

const path = glob.sync(pattern);

const config = {
  fileExtensions: ['js', 'jsx', 'coffee'],
  webpackConfig,
  baseDir,
  layout: 'dot',
  graphVizOptions: {
    G: {
      ranksep: 1.5
    }
  }
};

// Generate an image of the dependency graph
madge(path, config)
  .then(res => res.image(`${outPath}.${imageType}`))
  .then(path => console.log(`Created graph: ${path}`));

// Show circular dependencies
// madge(path).then((res) => {
//   console.log(res.circular());
// });
