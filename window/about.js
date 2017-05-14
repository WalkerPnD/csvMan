'use strict';

const
  electron      = require('electron'),
  dialog        = electron.dialog,
  menuLabel     = {
    label      : 'About',
    accelerator: 'CmdOrCtrl+Shift+A',
    click      : create
  };

module.exports = {
  menuLabel,
  create
}

function create(){
  dialog.showMessageBox({
    type: 'info',
    buttons: ['OK'],
    message: 'About This App',
    detail: 'created by Koji Carvalho (Walker)'
  });
}