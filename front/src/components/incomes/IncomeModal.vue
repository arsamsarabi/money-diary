<template>
  <v-modal name="income-modal" @before-open="beforeOpen">
    <div class="container">
      <h1 class="modal-title">
        {{ modalTitle }}
      </h1>

      <div class="form">
        <label for="account-name">Title:</label>
        <input type="text" id="account-name" placeholder="Account name..." v-model="account.name" />
      </div>

      <div class="actions-confirm" v-if="isDeleting">
        <p>
          Deleting an account will also delete <strong>all transactions</strong> associated with it. Are you sure? this
          is <strong>permanent</strong>!
        </p>
        <div>
          <button @click="handleCancelDelete" class="cancel">Cancel</button>
          <button @click="handleConfirm" class="confirm-delete" v-if="isEditMode">
            Confirm
          </button>
        </div>
      </div>

      <div class="actions" v-else>
        <button @click="handleSubmit" class="success" :disabled="disabled">
          {{ isEditMode ? 'Save' : 'Submit' }}
        </button>
        <button @click="handleClose" class="cancel">Cancel</button>
        <button @click="handleDelete" class="delete" v-if="isEditMode">
          <v-icon name="trash-alt" />
        </button>
      </div>
    </div>
    <v-modal name="confirm-dialog" />
  </v-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IncomeModal',
  data() {
    return {
      account: {
        name: '',
        id: null,
      },
      isDeleting: false,
    }
  },
  methods: {
    ...mapActions(['postAccount', 'patchAccount', 'deleteAccount']),
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
    handleConfirm() {
      this.deleteAccount({ id: this.account.id })
      this.handleClose()
    },
    handleDelete() {
      this.isDeleting = true
    },
    handleCancelDelete() {
      this.isDeleting = false
    },
  },
  computed: {
    isEditMode() {
      return Boolean(this.account.id)
    },
    modalTitle() {
      return this.isEditMode ? `Edit ${this.account.name} Income` : 'New Income'
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
}

.actions-confirm {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  p {
    font-size: 0.9rem;
    color: var(--color-danger);
    strong {
      font-weight: bold;
    }
  }
  div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 8px;
  }
}

button {
  @include button;

  &:not(:last-of-type) {
    margin-right: 16px;
  }

  &.success {
    @extend %button-primary;
  }

  &.cancel {
    @extend %button-neutral;
  }

  &.delete {
    @extend %button-danger;
    width: 48px;
    min-width: 48px;
  }

  &.confirm-delete {
    @extend %button-danger;
  }
}
</style>
