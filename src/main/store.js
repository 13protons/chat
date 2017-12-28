import {app} from 'electron';
import path from 'path';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const configObj = ensureConfig();
const userDb = findOrCreateDbFile('user');

export {configObj as config, userDb as user};

/**
* Synchronously get or create the app config file
* @return {Object} containing the `clientID` & installation `created` timestamp
*/
function ensureConfig() {
  let db = findOrCreateDbFile('config');
  let id = db.get('clientID').value();
  if (id.length === 0) {
    // don't even import uuid unless we definitely need it
    const uuidv1 = require('uuid/v1');
    let uid = uuidv1();

    db.set('clientID', uid).value();
    db.set('created', Date.now()).value();
    db.write();
  }

  return db.getState();
}


/**
* Create a FileSync instance of LowDB at `name`.json in `userData` dir
* If present, the file in `./support/${name}.json` is used as a template
* @param {String} name the name of the file `.json` file without the extension
* @return {Object} a lowdb instance
*/
function findOrCreateDbFile(name) {
  let file = path.resolve(app.getPath('userData'), `${name}.json`);
  let adapter = new FileSync(file);
  let options = {};

  try {
    options = require(path.resolve('./support/', `${name}.json`));
  } catch (e) {}

  let db = low(adapter);
  // // Set some defaults
  db.defaults(options)
    .write();

  return db;
}
