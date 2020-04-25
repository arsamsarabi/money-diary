<template>
  <v-modal name="account-modal" @before-open="beforeOpen">
    <div class="container">
      <h1 class="modal-title">
        {{ modalTitle }}
      </h1>

      <div class="form">
        <label for="account-name">Account Name:</label>
        <input type="text" id="account-name" placeholder="Account name..." v-model="account.name" />
      </div>

      <div class="actions">
        <button @click="handleSubmit" class="success" :disabled="disabled">
          {{ isEditMode ? 'Save' : 'Submit' }}
        </button>
        <button @click="handleClose" class="cancel">Cancel</button>
        <button @click="handleClose" class="delete">
          <v-icon name="trash-alt" />
        </button>
      </div>
    </div>
  </v-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AccountModal',
  data() {
    return {
      account: {
        name: '',
        id: null,
      },
    }
  },
  methods: {
    ...mapActions(['postAccount', 'patchAccount']),
    beforeOpen(event) {
      if (event?.params?.id) {
        this.account = { id: event.params.id, name: event.params.name }
      }
    },
    handleSubmit() {
      if (this.account.id) {
        this.patchAccount({
          id: this.account.id,
          name: this.account.name,
        })
      } else {
        this.postAccount(this.account.name)
      }
      this.handleClose()
    },
    handleClose() {
      this.account = { name: '', id: null }
      this.$emit('close-modal')
    },
  },
  computed: {
    isEditMode() {
      return Boolean(this.account.id)
    },
    modalTitle() {
      return this.isEditMode ? `Edit ${this.account.name} Account` : 'New Account'
    },
    disabled() {
      return !this.account.name.length
    },
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
.form {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  label {
    font-family: var(--font-secondary);
    font-weight: bold;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    margin-top: 8px;
    height: 48px;
    padding: 0 8px;
    border: none;
    font-size: 1.15rem;
    border: 1px solid var(--color-grey-light);
    border-radius: var(--border-r-xs);
    transition: 0.2s all ease-in-out;
    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  button {
    @include button;

    &:not(:last-of-type) {
      margin-right: 16px;
    }

    &.success {
      @extend %button-success;
    }

    &.cancel {
      @extend %button-neutral;
    }

    &.delete {
      @extend %button-danger;
      width: 48px;
      min-width: 48px;
    }
  }
}
</style>
