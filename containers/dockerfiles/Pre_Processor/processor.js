var http = require('http');
var fs = require('fs');
var lineReader = require('line-reader');
const lineByLine = require('./readlines.js'); //https://github.com/nacholibre/node-readlines
var path = require('path');
var faker = require('faker');

var src = "/Users/julian2/Documents/Pre_Processor/input/cucumber-webdriverio";
var dest = "/Users/julian2/Documents/Pre_Processor/output/out";

String.prototype.contains = function(test) {
    return this.indexOf(test) == -1 ? false : true;
};

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var myMap = new Map();

var copyRecursiveSync = function(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      var isFeature = childItemName.contains('.feature');
      if (!isFeature) {
        console.log(" - " + path.join(dest, childItemName));
        copyRecursiveSync(path.join(src, childItemName),
                          path.join(dest, childItemName));
      } else {
        var filePath = path.join(dest, childItemName);
        console.log(" - " + filePath);

        const liner = new lineByLine(path.join(src, childItemName));
        let line;
        let lineNumber = 0;
        var fileContent = '';
        while (line = liner.next()) {
          if(line.indexOf('Scenario') != -1) {
            console.log(myMap);
            console.log("Procesando nuevo Scenario->"+ (myMap.size>0))
            if(myMap.size>0) {
              fileContent+= createTable(myMap);
            }
            myMap = new Map();
            
          }
          fileContent+= line.toString('ascii') +"\n";
            //console.log(' Line ' + lineNumber + ': ' + line.toString('ascii'));
            var result = getFromBetween.get(String(line),"<",">");
            addParamsToMap(result);
            lineNumber++;
        }
        if(myMap.size>0) {
            fileContent+= createTable(myMap);
            myMap = new Map();
        }
        console.log("\n\n"+fileContent);

        fs.writeFile(filePath, fileContent, function(err) {
          if(err) {
             console.log(err);
          }
          console.log("The file was saved!");
        }); 

        console.log(' End of line reached');

      }
    });
  } else {
    fs.linkSync(src, dest);
  }
};

var createTable = function(myMap) {
  var tableStr = "    Examples:\n";
  tableStr+= "     |";
  for (let [key, value] of myMap.entries()) {
      tableStr+= key  +"      | ";
  }

  tableStr+= "\n";
  tableStr+= "     |";
  for (let [key, value] of myMap.entries()) {
      tableStr+= value  +"      | ";
  }
  tableStr+= "\n\n";
  return tableStr;
}

var addParamsToMap = function(params) {
  for (i = 0; i < params.length; i++) { 
    var param = params[i];
    if (param.startsWith("random")) { //Omitir params no randoms
      myMap.set(param, getFaker(param));
    }
  }
}

var getFaker = function(param) { //https://github.com/marak/Faker.js/
  switch(param) {
    case "randomName":
        return faker.name.findName();
        break;
    case "randomEmail":
        return faker.internet.email();
        break;
    case "randomPhone":
        return faker.phone.phoneNumber();
        break;
    case "randomUserName":
        return faker.internet.userName();
        break;
    case "randomPassword":
        return faker.internet.password();
        break;
    case "randomText":
        return faker.lorem.text();
        break;
    case "randomWord":
        return faker.lorem.word();
        break;
    default:
        return faker.helpers.randomize();
  }
}



var getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1)+sub1.length;
        var string1 = this.string.substr(0,SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        }
        else return;
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
};

deleteFolderRecursive(dest, function () { console.log('done'); });

copyRecursiveSync(src, dest);
