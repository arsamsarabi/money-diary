<template>
  <div class="expense-collapse">
    <header class="collapse-header">
      <button @click="toggleExpanded">
        <div class="left-col">
          <div class="icon-wrapper" :style="style">
            <v-icon :name="categories[0].icon" />
          </div>
        </div>
        <div class="right-col">
          <div class="text">
            <h2>{{ expense.title }}</h2>
            <p>{{ dateBuilder(expense.startDate) }}</p>
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
      <p>account name</p>
      <p>{{ expense.description }}</p>
      <div v-for="category in categories" :key="category.id">
        {{ category.name }}
      </div>
      <p>is recurring icon {{ expense.isRecurring }}</p>
      <p>end date?</p>
    </main>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { lighten } from 'polished'
import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/caret-down'

import { getOneCategory } from '../categories/categories'

export default {
  name: 'ExpanseCollapse',
  props: ['expense'],
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    style() {
      return `
        color: ${this.categories[0].color};
        background-color: ${lighten(0.4, this.categories[0].color)};
      `
    },
    categories() {
      return this.expense.categories.map(cat => getOneCategory('id', cat))
    },
    togglerName() {
      return this.isExpanded ? 'caret-up' : 'caret-down'
    },
    collapseClass() {
      return this.isExpanded ? 'collapsible-open' : 'collapsible-close'
    },
  },
  methods: {
    dateBuilder(date) {
      return date ? dayjs(date).format('D MMM') : 'Date: -'
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

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
        h2 {
          color: var(--color-primary);
          font-family: var(--font-secondary);
          font-weight: bold;
        }
        p {
          font-size: 0.85rem;
          color: var(--color-grey-dark);
        }
      }
      .amount {
        margin-right: 32px;
        color: var(--color-danger);
        font-weight: bold;
        font-size: 1.25rem;
      }
      .toggler {
        color: var(--color-primary);
      }
    }
  }
}

.collapse-body {
  overflow: hidden;
  transition: 0.1s height ease-in, 0.2s opacity ease-in;

  &.collapsible-close {
    height: 0;
    opacity: 0;
  }
  &.collapsible-open {
    height: initial;
    padding: 16px;
    opacity: 1;
  }
}
</style>
