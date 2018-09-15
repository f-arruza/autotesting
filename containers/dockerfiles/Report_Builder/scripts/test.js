const path = require('path');

const uuidv1 = require('uuid/v1');
const rimraf = require('rimraf');
const shell = require('shelljs');

const combine = require('./combine.js');
// generate mochawesome report
const data = combine.combineMochaAwesomeReports();
const uuid = uuidv1();
combine.writeReport(data, uuid);

shell.exec(`./node_modules/.bin/marge ${uuid}.json  --reportDir /data/reports`, (code, stdout, stderr) => {
  if (stderr) throw stderr;
  rimraf(path.join(__dirname, '..', `${uuid}.json`), () => {}); //Lo crea en la ruta
});
