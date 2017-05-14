'use strict';

const
  electron      = require('electron'),
  view          = require('../lib/util').view,
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