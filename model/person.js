'use strict';

let
  fs         = require('fs-extra'),
  csv        = require('csvtojson'),
  path       = __dirname + '/../data/',
  dao        = require('../dao'),
  paging     = 5000,
  headers    = [ 'name', 'url', 'company', 'role', 'time', 'local' ],
  personDao  = require('../dao').personDao,
  createOptions = { ignoreDuplicates: true},
  exportName = 'export.csv';

person.prototype.loadFiles = _loadFiles;
person.prototype.list = _list;

module.exports = new person();



function person(){
  this.name = 'koji';
}

function _loadFiles(){
  dao.sequelize.sync({force: true});
  fs.readdir(path, readDirFiles);
}

function _list(page){
  let offset = page || 0;
  offset = offset * paging;
  let
    limit = paging + 1,
    list = {
      persons: [],
      hasPrev: false,
      hasNext: false,
      paging
    };
  
  return new Promise( function(resolve, reject){
    personDao.findAll({offset, limit})
    .then(function(datas){
      datas = datas.map( (r) => ( r.get({plain:true}) ) )
      if (datas.length > paging) datas.pop();
      list.persons = datas;
      list.hasPrev = (offset != 0);
      list.hasNext = (datas.length > limit);
      resolve(list);
    })
    .catch(function(e){
      reject(list);
    });
  });
}

function _dump(){
  personDao.findAll()
  .then(function(){
    
  })
  .catch(console);
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