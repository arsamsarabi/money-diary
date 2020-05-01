<template>
  <div class="card">
    <img :src="userImage" :alt="username" />
    <h1>
      Hello,
      <span>{{ username }}</span>
      ! 👋🏻
    </h1>

    <div class="actions">
      <button @click="$modal.show('user-modal', username)" class="standard">
        <p>Edit profile</p>
        <v-icon name="pencil-alt" />
      </button>
      <button @click="handleLogout" class="danger">
        <p>Logout</p>
        <v-icon name="sign-out-alt" />
      </button>
    </div>

    <UserModal v-on:close-modal="$modal.hide('user-modal')" />
  </div>
</template>

<script>
import UserModal from '@/components/UserModal'
import DefaultImage from '@/assets/avatar-placeholder.svg'

import { mapGetters } from 'vuex'

export default {
  name: 'ProfileCard',
  components: {
    UserModal,
  },
  computed: {
    ...mapGetters(['getUser']),
    userImage() {
      return this.getUser?.image || DefaultImage
    },
    username() {
      return this.getUser?.name || ''
    },
  },
  methods: {
    handleLogout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.card {
  @include card-with-shadow;
  width: 100%;
  margin-top: 48px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 75px;
    height: 75px;
    overflow: hidden;
    border: 2px solid var(--color-grey-light);
    border-radius: 50%;
  }

  h1 {
    font-family: var(--font-secondary);
    font-size: 1.25rem;
    margin: 16px 0;
    span {
      text-transform: capitalize;
    }
  }
}

.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  & > button {
    width: 100%;
    text-decoration: none;
    color: var(--color-grey);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s all ease-in;
    &:hover,
    &:focus {
      cursor: pointer;
    }
    &:not(:last-of-type) {
      margin-bottom: 8px;
    }

    &.standard {
      &:hover,
      &:focus {
        color: var(--color-primary);
      }
    }

    &.danger {
      &:hover,
      &:focus {
        color: var(--color-danger);
      }
    }
  }
}
</style>
