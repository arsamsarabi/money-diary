<template>
  <router-link :to="path">
    <p>{{ text }}</p>
    <v-icon :name="icon" />
  </router-link>
</template>

<script>
export default {
  name: 'NavLinkIcon',
  props: ['icon', 'text', 'path'],
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: var(--color-grey-dark);
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
