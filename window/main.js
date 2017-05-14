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
}

/* /////////
  IPC settings
///////// */

ipcMain.on('readCsvFiles', function(event, paths){
  person.loadFiles();
});


/* /////////
  Funcions
///////// */

function useMenu(m){
  menu = m;
}

function create(){
  if(menu) Menu.setApplicationMenu(menu);

  w = new BrowserWindow({width: 600, height: 400});
  w.loadURL(view('main'));
  w.webContents.openDevTools();
  w.on('closed', function() {
    w = null;
  });
}

function webContents(){
  return w.webContents;
}
