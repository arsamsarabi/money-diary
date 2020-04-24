<template>
  <div class="expense-collapse">
    <header class="collapse-header">
      <div class="left-col"></div>
      <div class="right-col">
        <div class="text">
          <h2></h2>
          <p></p>
        </div>
        <p class="amount"></p>
        <div class="toggler"></div>
      </div>
    </header>
    <main class="collapse-body"></main>
  </div>
</template>

<script>
export default {
  name: 'ExpanseCollapse',
}
</script>

<style lang="scss" scoped>
.expense-collapse {
}
</style>
