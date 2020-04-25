<template>
  <v-modal name="account-modal" @before-open="beforeOpen">
    <div class="container">
      <h1 class="modal-title">
        {{ modalTitle }}
      </h1>
    </div>
  </v-modal>
</template>

<script>
export default {
  name: 'AccountModal',
  data() {
    return {
      account: {},
    }
  },
  methods: {
    beforeOpen(event) {
      if (event?.params?.id) {
        this.account = { id: event.params.id, name: event.params.name }
      }
    },
  },
  computed: {
    modalTitle() {
      return this.account.id ? `Edit ${this.account.name} Account` : 'New Account'
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
