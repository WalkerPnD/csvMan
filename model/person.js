'use strict';

let
  fs         = require('fs-extra'),
  csv        = require('csvtojson'),
  path       = __dirname + '/../data/',
  dao        = require('../dao'),
  paging     = 1500,
  headers    = [ 'name', 'url', 'company', 'role', 'time', 'local' ],
  personDao  = require('../dao').personDao,
  createOptions = { ignoreDuplicates: true},
  exportName = 'export.csv';

person.prototype.loadFiles = _loadFiles;
person.prototype.list = _list;
person.prototype.dump= _dump;

module.exports = new person();

function person(){
  this.name = 'koji';
}

function _loadFiles(){
  dao.sequelize.sync({force: true})
  .then(function(e){
    fs.readdir(path, readDirFiles);
  })
  .catch(console.log);
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
      list.hasNext = (datas.length > paging);
      datas = datas.map( (r) => ( r.get({plain:true}) ) )
      if (datas.length > paging) datas.pop();
      list.persons = datas;
      list.hasPrev = (offset != 0);
      resolve(list);
    })
    .catch(function(e){
      console.log(e);
      reject(list);
    });
  });
}

function _dump(){
  let
    csvString = 'Nome,URL,Empresa,Cargo,Tempo,Local\n',
    p = [];
  
  return personDao.findAll()
  .then(function(datas){
    datas = datas.map( r => ( r.get({plain:true}) ) );
    datas.forEach( function(r){
      Array.from(r).map( s => s.replace(/"/g, '""'));
      csvString += `"${r.name}","${r.link}","${r.company}","${r.role}","${r.career}","${r.location}"\n`;
    });
    fs.writeFile(__dirname + '/../dump.csv', csvString, console.log);
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