'use strict';

const
  electron      = require('electron'),
  view          = require('../lib/util').view,
  mainWindow    = require('./main'),
  BrowserWindow = electron.BrowserWindow,
  ipcMain       = electron.ipcMain,
  menuLabel     = {
    label      : 'Settings',
    accelerator: 'CmdOrCtrl+Shift+S',
    click      : create
  };

let
  menu,
  w;

module.exports = {
  menuLabel,
  create
}
/* /////////
  IPC settings
///////// */

ipcMain.on('settings_changed', function(event, color){
  mainWindow.webContents().send('set_bgcolor', color);
});


function create(){
  w = new BrowserWindow({width: 300, height: 200});
  w.loadURL(view('settings'));
  w.show();
  w.webContents.openDevTools();
  w.on('closed', function() {
    w = null;
  });
}

