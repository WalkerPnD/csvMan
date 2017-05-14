'use strict';

const
  electron      = require('electron'), // Electron's Module
  Menu          = electron.Menu,
  window        = require('../window')

  
module.exports =  mainMenu; // Global menu


function mainMenu(app){
  let menuTemplate = [{
    label: 'csvManipulator',
    submenu: [
      window.about.menuLabel,
      { type: 'separator' },
      window.settings.menuLabel,
      { type: 'separator' },
      { label      : 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click      : app.quit
      },
    ]
  }];
  return Menu.buildFromTemplate(menuTemplate);
}