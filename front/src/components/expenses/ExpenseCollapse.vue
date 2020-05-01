<template>
  <div class="expense-collapse">
    <header class="collapse-header">
      <button @click="toggleExpanded">
        <div class="left-col">
          <div class="icon-wrapper" :style="categoryColoresStyle(expense.categories[0])">
            <v-icon :name="expense.categories[0].icon" />
          </div>
        </div>
        <div class="right-col">
          <div class="text">
            <h2>{{ expense.title }}</h2>
            <p>{{ dateBuilder(expense.date) }}</p>
          </div>
          <p class="amount">
            <span>- £</span>
            {{ expense.amount }}
          </p>
          <div class="toggler">
            <v-icon :name="togglerName" scale="1.25" />
          </div>
        </div>
      </button>
    </header>
    <main class="collapse-body" :class="collapseClass">
      <div class="category-pills-wrapper">
        <div
          v-for="category in expense.categories"
          :key="category.id"
          class="category-pill"
          :style="categoryColoresStyle(category)"
        >
          <p>{{ category.label }}</p>
        </div>
      </div>

      <div class="payee">
        <span>Payee: </span>
        <p>{{ expense.payee }}</p>
      </div>

      <div class="account-name">
        <span>Account: </span>
        <p>{{ getAccountName(expense.accountId) }}</p>
      </div>

      <div class="description">
        <span>Description: </span>
        <p>{{ expense.description }}</p>
      </div>

      <div class="actions">
        <v-icon name="pencil-alt" scale="0.8" @click="$emit('edit-expense', expense)" />
      </div>
    </main>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { lighten } from 'polished'
import { mapGetters } from 'vuex'

export default {
  name: 'ExpanseCollapse',
  props: ['expense'],
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    ...mapGetters(['getCategories']),
    togglerName() {
      return this.isExpanded ? 'caret-up' : 'caret-down'
    },
    collapseClass() {
      return this.isExpanded ? 'collapsible-open' : 'collapsible-close'
    },
  },
  methods: {
    categoryColoresStyle(category) {
      return `
        color: ${category.color};
        background-color: ${lighten(0.4, category.color)};
      `
    },
    dateBuilder(date) {
      return date ? dayjs(date).format('D MMM') : 'Date: -'
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },
    getAccountName(id) {
      const account = this.$store.getters.getAccountById(id)
      return account ? account.name : ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

@mixin label-and-text {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 8px;

  span {
    font-family: var(--font-secondary);
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--color-grey);
    margin-right: 8px;
    line-height: 1.8;
    min-width: 100px;
  }
}

.expense-collapse {
  @include card-with-shadow;
}

.collapse-header {
  button {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    color: var(--color-secondary);
    text-transform: initial;
    .left-col {
      width: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-wrapper {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--border-r-s);
      }
    }
    .right-col {
      display: flex;
      align-items: center;
      flex: 1;
      padding-right: 24px;
      .text {
        flex: 1;
        text-align: left;
        h2 {
          font-family: var(--font-secondary);
          font-weight: bold;
        }
        p {
          font-size: 0.85rem;
          color: var(--color-grey);
        }
      }
      .amount {
        margin-right: 32px;
        color: var(--color-danger);
        font-weight: bold;
        font-size: 1.25rem;
      }
      .toggler {
        color: var(--color-grey);
      }
    }
  }
}

.collapse-body {
  overflow: hidden;
  transition: 0.1s height ease-in, 0.2s opacity ease-in;
  display: flex;
  flex-direction: column;

  &.collapsible-close {
    height: 0;
    opacity: 0;
  }
  &.collapsible-open {
    height: initial;
    padding: 16px;
    opacity: 1;
    border-top: 1px dotted var(--color-grey-light);
  }

  .account-name {
    @include label-and-text;
  }

  .payee {
    @include label-and-text;
  }

  .description {
    @include label-and-text;
  }

  .category-pills-wrapper {
    display: flex;
    margin-bottom: 16px;
    .category-pill {
      padding: 4px;
      border-radius: var(--border-r-s);
      &:not(:last-of-type) {
        margin-right: 8px;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }
}

.actions {
  width: 100%;
  text-align: right;
  svg {
    color: var(--color-grey-light);
    transition: 0.2s all ease-in-out;
    &:hover {
      cursor: pointer;
      color: var(--color-grey);
    }
  }
}
</style>
