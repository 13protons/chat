<template>
  <div>
    <div class="items">
      <div class="item">
        <div class="name">UID:</div>
        <div class="value">{{ user.uid }}</div>
      </div>
      <div class="item">
        <div class="name">Created:</div>
        <div class="value">{{ user.created }}</div>
      </div>
      <div class="item">
        <div class="name">Name:</div>
        <div class="value">{{ user.name }}</div>
      </div>
      <div class="item">
        <div class="name">Display Name:</div>
        <div class="value">{{ user.displayName }}</div>
      </div>
      <span @click="edit">Edit</span>
    </div>

    <div class="edit" v-if="editing">
      <div class="field">
        <label class="label">Real Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Your Real name" v-model="username">
        </div>
      </div>

      <div class="field">
        <label class="label">Display Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Your Display Name" v-model="displayName">
        </div>
      </div>
      <button class="button is-primary" @click="save">Save</button><span @click="editing =!editing">Cancel</span></edit>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        displayName: '',
        user: this.$store.state.User,
        editing: false
      };
    },
    methods: {
      save() {
        console.log('should save now');
        this.$store.dispatch('updateUser', {
          name: this.username,
          displayName: this.displayName
        });
        this.editing = false;
      },
      edit() {
        let clone = JSON.parse(JSON.stringify(this.$store.state.User));
        console.log('user clone', clone);
        this.$set(this, 'username', clone.name);
        this.$set(this, 'displayName', clone.displayName);
        this.editing = true;
      }
    }
  };
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
