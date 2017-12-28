# Chat

> A local networking chat experiment

# Why

Communication tools should empower us not only to connect but also to own our data and control who has access to it.

Software teams live in chat, but why should their data live on someone else's server when most of their interactions happen under the same roof? Why not make a local-first, client-to-client interaction the default with remote servers only stepping in later when there's technically no other choice?

I would love to build just that sort of tool.

It will be a robust chat client that developers (and the rest of us!) love to use for daily communication with strong controls for encryption and data transfer. Clients will interact through direct P2P connection whenever possible and the default setup will be compatible with the strict IT requirements of fortune <=50 companies, no credit card or enterprise agreement required. A centralized broker system will only be built as the very last piece to do hard things that clients can't figure out without help, like indirect peer discovery in complex network environments, account backup, and 3rd party service integrations.

If this sounds like something you want to be involved in, then please get involved and help push this project forward!

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[1c165f7](https://github.com/SimulatedGREG/electron-vue/tree/1c165f7c5e56edaf48be0fbb70838a1af26bb015) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
