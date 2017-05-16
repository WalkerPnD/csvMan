Electron expample

to Build
```terminal
electron-packager ./ samp --platform=darwin --arch=x64 --version=1.6.7
electron-packager . csvMan platform=win32 --arch=x64 --version=1.6.8
```


due to Sqlite3 problem
https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md
```terminal
./node_modules/.bin/electron-rebuild --version=1.6.7
```