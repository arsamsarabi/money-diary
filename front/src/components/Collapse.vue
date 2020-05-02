<template>
  <div class="collapse-container">
    <header class="collapse-header">
      <button @click="toggleExpanded">
        <div class="left-col">
          <slot name="header" />
        </div>
        <div class="right-col">
          <div class="toggler">
            <v-icon :name="togglerName" scale="1.25" />
          </div>
        </div>
      </button>
    </header>
    <main class="collapse-body" :class="collapseClass">
      <slot name="body" />
    </main>
  </div>
</template>

<script>
import { lighten } from 'polished'

export default {
  name: 'Collapse',
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    togglerName() {
      return this.isExpanded ? 'caret-up' : 'caret-down'
    },
    collapseClass() {
      return this.isExpanded ? 'collapsible-open' : 'collapsible-close'
    },
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/mixins.scss';

.collapse-container {
  @include card-with-shadow;
}

.collapse-header {
  width: 100%;
  button {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    color: var(--color-secondary);
    text-transform: initial;
    overflow: hidden;
    .left-col {
      flex: 1;
      display: flex;
    }
    .right-col {
      width: 30px;
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
}
</style>
