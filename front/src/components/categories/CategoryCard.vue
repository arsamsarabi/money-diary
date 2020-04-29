<template>
  <div class="wrapper" :style="style">
    <div class="icon">
      <v-icon :name="category.icon" scale="1.5" />
    </div>
    <div class="text">
      <p class="label">{{ category.label }}</p>
      <p class="amount">£ {{ parseFloat(category.expensesSum).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: ['category'],
  computed: {
    style() {
      return `background-color: ${this.category.color}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.wrapper {
  @include card-with-shadow;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 175px;
  min-width: 175px;
  height: 64px;
  padding: 0 16px;
  color: var(--color-white);
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
}

.text {
  padding-left: 16px;

  font-weight: bold;
  .label {
    font-size: 0.9rem;
  }
  .amount {
  }
}
</style>
