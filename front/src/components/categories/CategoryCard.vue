<template>
  <div class="wrapper" :style="style">
    <div class="icon">
      <v-icon :name="icon" scale="1.5" />
    </div>
    <div class="text">
      <p class="label">{{ label }}</p>
      <p class="amount">{{ this.formattedAmount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
    color: {
      type: String,
    },
    amount: {
      type: String,
      default: '-',
    },
  },
  computed: {
    style() {
      return `background-color: ${this.color}`
    },
    formattedAmount() {
      return `£ ${this.amount}`
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  border-radius: var(--border-r-s);
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
