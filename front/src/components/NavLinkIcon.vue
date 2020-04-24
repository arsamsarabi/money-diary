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
  width: 100%;
  text-decoration: none;
  color: var(--color-grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
