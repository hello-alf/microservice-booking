let common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require ./test/integration/steps/**/*.ts',
  '--format progress-bar',
  `--format-options '{"snippetInterface": "synchronous"}'`,
  '--parallel 2 --format html:test/reports/integration-test-report.html',
].join(' ');

module.exports = {
  default: common,
};
