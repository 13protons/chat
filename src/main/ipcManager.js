import {ipcMain} from 'electron';
import {user} from './store.js';

// console.log('got app config', config);

ipcMain.on('request-user', function(event, arg) {
  event.sender.send('announce-user', user.getState());
});

ipcMain.on('update-user', function(event, arg) {
  console.log('update user with', arg);
  if (arg.name) {
    user.set('name', arg.name).value();
  }

  if (arg.displayName) {
    user.set('displayName', arg.displayName).value();
  }
  user.write();
  event.sender.send('announce-user', user.getState());
});
