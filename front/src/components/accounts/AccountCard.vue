<template>
  <div class="wrapper">
    <div class="icon">
      <p class="name">{{ account.name }}</p>
    </div>
    <div class="text">
      <p class="expenditure">This months's total expenditure:</p>
      <!-- <p>£ {{ account.sum }}</p> -->
    </div>
    <div class="actions">
      <v-icon name="pencil-alt" />
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/pencil-alt'

export default {
  name: 'AccountCard',
  props: ['account'],
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.wrapper {
  @include card-with-shadow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 175px;
  height: 225px;
  padding: 16px;
}
</style>
