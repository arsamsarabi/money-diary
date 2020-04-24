<template>
  <div class="wrapper" :style="style">
    <div class="icon">
      <v-icon :name="icon" scale="1.5" />
    </div>
    <div class="text">
      <p class="label">{{ label }}</p>
      <p class="amount">£ {{ sum }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    id: {
      type: String,
    },
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  computed: {
    style() {
      return `background-color: ${this.color}`
    },
    sum() {
      return this.$store.getters.getTotalByCategory(this.id)
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
