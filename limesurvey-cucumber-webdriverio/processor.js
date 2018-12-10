var http = require('http');
var fs = require('fs');
var lineReader = require('line-reader');
const lineByLine = require('./readlines.js');
var path = require('path');
var faker = require('faker');

var src = "C:/Users/wilme/Documents/autotesting/limesurvey-cucumber-webdriverio/input/features";

String.prototype.contains = function(test) {
    return this.indexOf(test) == -1 ? false : true;
};

var myMap = new Map();

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

var execute_preprocessor = function(src) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {
    var outputFolder = path.join(src, 'out');
    if(fs.existsSync(outputFolder)) {
      deleteFolderRecursive(outputFolder);      
    }
    fs.mkdirSync(outputFolder);

    fs.readdirSync(src).forEach(function(childItemName) {
      var isFeature = childItemName.endsWith('.feature');
      if (isFeature) {
        console.log(childItemName);
        const liner = new lineByLine(path.join(src, childItemName));
        let line;
        let lineNumber = 0;
        var fileContent = '';
        var randomExamplesNumber = 1;
        while (line = liner.next()) {
          if(line.indexOf('Scenario') != -1) {
            console.log(myMap);
            console.log("Procesando nuevo Scenario->"+ (myMap.size>0))
            if(myMap.size>0) {
              fileContent+= createTable(myMap, randomExamplesNumber);
            }
            myMap = new Map();
          }
          fileContent+= line.toString('ascii') +"\n";
          var result = getFromBetween.get(String(line),"<",">");
          addParamsToMap(result);

          var tempVar = getFromBetween.get(String(line),"[randomExamples=","]");
          if (tempVar != false){
            console.log("Random examples number = " + tempVar);
            randomExamplesNumber = Number(tempVar);
          }
          
          lineNumber++;
        }
        if(myMap.size>0) {
            fileContent+= createTable(myMap, randomExamplesNumber);
            myMap = new Map();
        }
        console.log("\n\n"+fileContent);
        var filePath = path.join(outputFolder, childItemName);
        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.log(" - " + filePath);
        fs.writeFile(filePath, fileContent, function(err) {
          if(err) {
             console.log(err);
          }
          console.log("The file was saved!");
        });
        console.log(' End of line reached');
      }
    });
  }
};

var createTable = function(myMap, randomExamplesNumber) {
  var tableStr = "    Examples:\n";
  tableStr+= "     |";
  for (let [key, value] of myMap.entries()) {
      tableStr+= key  +"             | ";
  }

  console.log("creando table con #" + randomExamplesNumber + " records.");
  for (var i = 0; i < randomExamplesNumber;i++) {
    tableStr+= "\n";
    tableStr+= "     |";
    for (let [key, value] of myMap.entries()) {
        tableStr+= getFaker(key)  +"             | ";
    }
  }

  /*
  tableStr+= "\n";
  tableStr+= "     |";
  for (let [key, value] of myMap.entries()) {
      tableStr+= value  +"      | ";
  }
  */
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

execute_preprocessor(src);
