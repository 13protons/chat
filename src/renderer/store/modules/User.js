const {ipcRenderer} = require('electron');

const state = {
  uid: '',
  created: '',
  name: '',
  displayName: ''
};

const mutations = {
  changeUser(state, user) {
    Object.assign(state, user);
  }
};

const actions = {
  initUser({commit, state}) {
    ipcRenderer.once('announce-user', (event, userObj) => {
      commit('changeUser', userObj);
    });
    ipcRenderer.send('request-user');
  },
  updateUser({commit, state}, params) {
    console.log('attempting to save user updates');
    let newName = params.name && state.name !== params.name;
    let newDN = state.displayName !== params.displayName;
    if (newName || newDN) {
      ipcRenderer.once('announce-user', (event, userObj) => {
        console.log('got name update');
        commit('changeUser', userObj);
      });
      let options = {};
      if (newName) {
        options.name = params.name;
      }

      if (newDN) {
        options.displayName = params.displayName;
      }
      ipcRenderer.send('update-user', options);
    }
  }
};

export default {
  state,
  mutations,
  actions,
};
