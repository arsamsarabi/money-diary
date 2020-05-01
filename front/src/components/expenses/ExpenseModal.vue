<template>
  <v-modal name="expense-modal" @before-open="beforeOpen" :width="600" :height="775">
    <div class="container">
      <h1 class="modal-title">
        {{ modalTitle }}
      </h1>

      <div class="form">
        <div class="form-group inline">
          <label for="expense-title">Expense title:</label>
          <input type="text" id="expense-title" placeholder="Expense title..." v-model="expense.title" />
        </div>

        <div class="form-group inline">
          <label for="expense-description">Description:</label>
          <textarea rows="3" id="expense-description" placeholder="Description ..." v-model="expense.description" />
        </div>

        <div class="form-group inline">
          <label for="expense-amount">Amount:</label>
          <input type="number" id="expense-amount" placeholder="Expense amount..." v-model="expense.amount" />
        </div>

        <div class="form-group inline">
          <label for="expense-account">Account</label>
          <multiselect
            id="expense-account"
            :value="selectedAccount"
            :options="getAccounts"
            :searchable="false"
            :show-labels="false"
            track-by="id"
            label="name"
            @select="selectAccount"
          >
            <template slot="singleLabel" slot-scope="{ option }">
              <span class="custom-account-style">
                {{ option.name }}
              </span>
            </template>
          </multiselect>
        </div>

        <div class="form-group inline">
          <label for="expense-payee">Payee:</label>
          <input type="text" id="expense-payee" placeholder="Payee..." v-model="expense.payee" />
        </div>

        <div class="form-group inline">
          <label for="expense-date">Date:</label>
          <input type="date" id="expense-date" v-model="expense.date" />
        </div>

        <div class="form-group inline">
          <label for="expense-categories">Categories:</label>
          <CategoriesSelect
            v-on:select-category="selectCategory"
            v-on:remove-category="removeCategory"
            :selectedCategories="expense.categories"
          />
        </div>

        <div class="form-group inline">
          <FancyCheckbox
            :checked="expense.recurring"
            label="Is this a reccuring expense?"
            v-on:on-change="handleRecurring"
          />
        </div>

        <div class="form-group inline" v-if="expense.recurring">
          <label for="expense-recurring">What is the frequency?</label>
          <multiselect
            id="expense-recurring"
            v-model="expense.frequency"
            :options="frequencyArray"
            :searchable="false"
            :show-labels="false"
            :value="frequencyArray[0]"
          />
        </div>

        <div class="form-group inline" v-if="expense.recurring">
          <label for="expense-enddate">Do you know the end date?</label>
          <input type="date" id="expense-enddate" v-model="expense.endDate" />
        </div>
      </div>

      <div class="actions-confirm" v-if="isDeleting">
        <p>Deleting an expense is <strong>permanent</strong>! Are you sure?</p>
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
import dayjs from 'dayjs'
import { mapActions, mapGetters } from 'vuex'

import CategoriesSelect from '@/components/categories/CategoriesSelect'
import FancyCheckbox from '@/components/FancyCheckbox'

export default {
  name: 'ExpenceModal',
  components: {
    CategoriesSelect,
    FancyCheckbox,
  },
  data() {
    return {
      expense: {
        id: null,
        title: '',
        description: null,
        amount: null,
        date: dayjs().format('YYYY-MM-DD'),
        recurring: false,
        frequency: null,
        endDate: null,
        categories: [],
        payee: null,
        accountId: null,
      },
      isDeleting: false,
    }
  },
  methods: {
    ...mapActions(['postExpense', 'patchExpense', 'deleteExpense']),
    beforeOpen(event) {
      if (event?.params?.id) {
        Object.keys(this.expense).forEach(key => {
          this.expense[key] = event.params[key]
        })
      }
    },
    handleSubmit() {
      if (this.expense.id) {
        this.patchExpense(this.getExpenseToPost())
      } else {
        this.postExpense(this.getExpenseToPost())
      }
      this.handleClose()
    },
    handleClose() {
      this.expense = {
        id: null,
        title: '',
        description: null,
        amount: null,
        date: dayjs().format('YYYY-MM-DD'),
        recurring: false,
        frequency: null,
        endDate: null,
        categories: [],
        payee: null,
        accountId: null,
      }
      this.isDeleting = false
      this.$emit('close-modal')
    },
    handleConfirm() {
      this.deleteExpense({ id: this.expense.id })
      this.handleClose()
    },
    handleDelete() {
      this.isDeleting = true
    },
    handleCancelDelete() {
      this.isDeleting = false
    },
    getExpenseToPost() {
      const tempExpense = {}
      Object.keys(this.expense).forEach(key => {
        if (typeof this.expense[key] === 'boolean' || (this.expense[key] && this.expense[key].length)) {
          tempExpense[key] = this.expense[key]
        }
      })
      return tempExpense
    },
    selectCategory(category) {
      this.expense.categories.push(category)
    },
    removeCategory(categoryId) {
      this.expense.categories = this.expense.categories.filter(cat => cat.id !== categoryId)
    },
    handleRecurring(checked) {
      this.expense.recurring = checked
      if (!checked) {
        this.expense.frequency = null
        this.expense.endDate = null
      }
    },
    selectAccount(account) {
      this.expense.accountId = account.id
    },
  },
  computed: {
    ...mapGetters(['getAccounts']),
    isEditMode() {
      return Boolean(this.expense.id)
    },
    modalTitle() {
      return this.isEditMode ? `Edit ${this.expense.title} Expense` : 'New Expense'
    },
    disabled() {
      return !this.expense.title.length
    },
    frequencyArray() {
      return ['Daily', 'Weekly', 'Monthly', 'Yearly']
    },
    selectedAccount() {
      return this.getAccounts.find(acc => acc.id === this.expense.accountId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';
@import '../../scss/forms.scss';

.v--modal-box {
  height: 80vh;
}

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
  justify-content: space-between;
  margin-top: 24px;
  .form-group {
    @extend %form-group;
    label {
      @extend %label;
    }

    input {
      @extend %input;
    }

    textarea {
      @extend %input;
      height: initial;
      resize: none;
      padding: 8px;
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

.custom-account-style {
  font-size: 1.125rem;
  color: var(--color-black);
  margin: 0;
  padding: 0;
}
</style>
