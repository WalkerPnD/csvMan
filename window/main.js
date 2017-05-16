'use strict';

const
  electron      = require('electron'),
  view          = require('../lib/util').view,
  person        = require('../model/person'),
  msg = 'test',
  Menu          = electron.Menu,
  BrowserWindow = electron.BrowserWindow, // Window criater Module
  dialog        = electron.dialog,
  ipcMain       = electron.ipcMain;

let
  menu,
  w;


module.exports = {
  webContents,
  useMenu,
  create
};

/* /////////
  IPC settings
///////// */

ipcMain.on('readCsvFiles', function(event, paths){
  person.loadFiles();
});

ipcMain.on('dump', function(event){
  person.dump();
});

ipcMain.on('get_personList', function(event, offset){
  refreshPersonData(offset);
});

/* /////////
  Funcions
///////// */

function useMenu(m){
  menu = m;
}

function create(){
  if(menu) Menu.setApplicationMenu(menu);

  w = new BrowserWindow({width: 800, height: 600});
  w.loadURL(view('main'));
  //w.webContents.openDevTools();
  w.on('closed', function() {
    w = null;
  });
}

function webContents(){
  return w.webContents;
}

function refreshPersonData(offset){
  person.list(offset)
  .then(function(r){
    w.webContents.send('set_personList', r);
  })
  .catch(function(r){
    w.webContents.send('set_personList', r);
  });
}