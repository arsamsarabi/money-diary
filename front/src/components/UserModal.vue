<template>
  <v-modal name="account-modal" @before-open="beforeOpen">
    <div class="container">
      <h1 class="modal-title">{{ username }}</h1>

      <div class="form">
        <label for="account-name">Edit Name:</label>
        <input type="text" id="account-name" placeholder="Account name..." v-model="account.name" />
      </div>

      <div class="actions">
        <button @click="handleSubmit" class="success" :disabled="disabled">
          {{ isEditMode ? 'Save' : 'Submit' }}
        </button>
        <button @click="handleClose" class="cancel">Cancel</button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AccountModal',
  data() {
    return {
      username: this.getUser.name,
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.container {
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  h1.modal-title {
    font-family: var(--font-secondary);
    font-size: 1.25rem;
  }
}
</style>
