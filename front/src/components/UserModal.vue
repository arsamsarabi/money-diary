<template>
  <v-modal name="user-modal">
    <div class="container">
      <h1 class="modal-title">{{ username.length ? username : 'Please enter a name' }}</h1>

      <div class="form">
        <label for="username">Edit Name:</label>
        <input type="text" id="username" placeholder="Your username..." v-model="username" />
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserModal',
  data() {
    return {
      username: '',
    }
  },
  created() {
    this.username = this.getUser.name
  },
  computed: {
    ...mapGetters(['getUser']),
    disabled() {
      return !this.username.length
    },
  },
  methods: {
    ...mapActions(['patchUser']),
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
