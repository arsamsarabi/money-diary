<template>
  <v-modal name="user-modal" @before-open="beforeOpen">
    <div class="container">
      <h1 class="modal-title">{{ username.length ? username : 'Please enter a name' }}</h1>

      <div class="form">
        <label for="username">Edit Name:</label>
        <input autocomplete="off" type="text" id="username" placeholder="Your username..." v-model="username" />
      </div>

      <div class="actions">
        <button @click="handleSubmit" class="success" :disabled="disabled">
          Save
        </button>
        <button @click="handleClose" class="cancel">Cancel</button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserModal',
  data() {
    return {
      username: '',
    }
  },
  computed: {
    disabled() {
      return !this.username.length
    },
  },
  methods: {
    ...mapActions(['patchUser']),
    beforeOpen(event) {
      if (event?.params) {
        this.username = event.params
      }
    },
    handleSubmit() {
      this.patchUser(this.username)
      this.handleClose()
    },
    handleClose() {
      this.$emit('close-modal')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/modals.scss';

.container {
  @extend %modal-container;
}

.form {
  @extend %modal-form;
}

.actions {
  @extend %modal-actions;
}
</style>
