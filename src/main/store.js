import {app} from 'electron';
import path from 'path';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const configObj = ensureConfig();
const userDb = ensureUser();

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
* Synchronously get or create the base user file
* @return {Object} representing the user db interface
* On first run an anonymous, nameless, user is created
*/
function ensureUser() {
  let db = findOrCreateDbFile('user');
  let id = db.get('uid').value();
  if (id.length === 0) {
    // don't even import uuid unless we definitely need it
    const uuidv4 = require('uuid/v4');
    let uid = uuidv4();

    db.set('uid', uid).value();
    db.set('created', Date.now()).value();
    db.write();
  }

  return db;
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
    options = require(`./support/${name}.json`);
  } catch (e) {
    console.log('could not set defaults for', name, e);
  }

  let db = low(adapter);
  // // Set some defaults
  db.defaults(options)
    .write();

  return db;
}
