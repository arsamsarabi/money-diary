<template>
  <multiselect
    id="expense-categories"
    :options="getCategories"
    :multiple="true"
    :clearOnSelect="true"
    :hideSelected="true"
    :closeOnSelect="false"
    :value="getCategories[0]"
    :taggable="true"
    :searchable="false"
    :max="5"
    track-by="id"
    label="label"
    v-model="localCategories"
    placeholder="Add a category, General will be added by default"
    @select="selectCategory"
    @remove="removeCategory"
  />
</template>

<script>
import Vue from 'vue'
import Multiselect from 'vue-multiselect'

import { defaultCategories } from '@/utils/categories'

Vue.component('multiselect', Multiselect)

export default {
  name: 'CategoriesSelect',
  components: { Multiselect },
  data() {
    return {
      localCategories: [],
    }
  },
  methods: {
    selectCategory(category) {
      this.$emit('select-category', category)
    },
    removeCategory(category) {
      this.$emit('remove-category', category)
    },
  },
  computed: {
    getCategories() {
      return defaultCategories
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style></style>
