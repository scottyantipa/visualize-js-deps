const execSync = require('child_process').execSync;

const firstMochaCommit = '3800231';
const repo = '../web2';
const revCmd = `git rev-list ${firstMochaCommit}~..HEAD`;
const revlistResult = execSync(`cd ${repo}; ${revCmd}`);
const shaList = revlistResult
  .toString()
  .split('\n')
  .filter(el => !!el) // filter out empty strings
  .reverse()
  ;

function makeGraph(sha, shaIndex) {
  execSync(`cd ${repo}; git checkout ${sha}`);

  const graphCmd = `node graph.js\
    '${repo}/app/client/**/*.spec.js*'\
    '${repo}/webpack.config.js'\
    '${repo}/app/client/'\
    png\
    ~/Desktop/run1/${shaIndex}
  `

  execSync(graphCmd);
}


shaList.forEach(makeGraph);
