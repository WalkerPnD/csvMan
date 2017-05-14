'use strict';

let
  fs         = require('fs-extra'),
  csv        = require('csvtojson'),
  path       = __dirname + '/../data/',
  headers    = [ 'name', 'url', 'company', 'role', 'time', 'local' ],
  personDao  = require('../dao').personDao,
  createOptions = { ignoreDuplicates: true},
  exportName = 'export.csv';

person.prototype.loadFiles = _loadFiles;

module.exports = new person();



function person(){
  this.name = 'koji';
}

function _loadFiles(){
  fs.readdir(path, readDirFiles);
}

function readDirFiles(err, files){
  if (err) throw err;
  Promise.all(files.map(saveCsv))
  .then()
  .catch(function(e){
    console.log(e);
  });
}

function saveCsv(file){
  return new Promise(function(resolve, reject){
    csv({ headers })
      .fromFile(path + file)
      .on('end_parsed', (datas) => {
        personDao.bulkCreate(datas.filter(dataFilter), createOptions)
        .then(resolve)
        .catch(reject);
      }).on('error', reject);
  });
}

function dataFilter(data, idex, array){
  return (data.name != 'LinkedIn Member');
}