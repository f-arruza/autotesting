const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const rimraf = require('rimraf');
const shell = require('shelljs');
const combine = require('./combine.js');

fs.readdir('/data/jsons', function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(file => {
        var folder = path.join('/data/jsons', file);
        if(fs.lstatSync(folder).isDirectory()) {
            var data = combine.combineMochaAwesomeReports(folder);
            var uuid = uuidv1();
            var output = path.join('/data/reports', file);
            combine.writeReport(data, uuid);


            shell.exec(`./node_modules/.bin/marge ${uuid}.json  --reportDir ` + output, (code, stdout, stderr) => {
              if (stderr) throw stderr;
              rimraf(path.join(__dirname, '..', `${uuid}.json`), () => {}); //Lo crea en la ruta
            });
        }
    });

    // generate mochawesome report
    // const data = combine.combineMochaAwesomeReports(files);
    //
    // const uuid = uuidv1();
    // combine.writeReport(data, uuid);
    //
    // shell.exec(`./node_modules/.bin/marge ${uuid}.json  --reportDir /data/reports`, (code, stdout, stderr) => {
    //   if (stderr) throw stderr;
    //   rimraf(path.join(__dirname, '..', `${uuid}.json`), () => {}); //Lo crea en la ruta
    // });
});
