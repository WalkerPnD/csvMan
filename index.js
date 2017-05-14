'use strict';

const
  electron = require('electron'), // Electron's Module
  model    = require('./model'),
  window   = require('./window'),
  dao      = require('./dao'),
  app      = electron.app; // Application Controller Motule

let
  mainMenu = model.mainMenu(app); // Global menu

_init();
/* /////////
  Window settings
///////// */

window.main.useMenu(mainMenu);

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') 
    app.quit();
});

app.on('activate', function(){
    window.main.create();
});

// electron init func
app.on('ready', function() {
  window.main.create();
});


/* /////////
  Funcions
///////// */

function _init(){
  // dao.sequelize.sync({force: true});
}