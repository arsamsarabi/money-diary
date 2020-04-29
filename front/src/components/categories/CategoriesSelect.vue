<template>
  <multiselect
    id="expense-categories"
    :options="getCategories"
    :multiple="true"
    :clearOnSelect="true"
    :hideSelected="true"
    :closeOnSelect="false"
    :value="returnCategoryTags"
    :taggable="true"
    :searchable="false"
    :max="5"
    track-by="id"
    label="label"
    placeholder="Add a category, General will be added by default"
    @select="selectCategory"
    @remove="removeCategory"
  >
    <template slot="tag" slot-scope="props">
      <span class="multiselect__tag custom-tag" :style="getStyles(props.option.color)">
        <section>
          <v-icon scale="0.7" :name="props.option.icon" />
          <span>{{ props.option.label }}</span>
        </section>
        <i
          aria-hidden="true"
          tabindex="1"
          class="multiselect__tag-icon"
          :data-category-id="props.option.id"
          @click="removeCategory"
        />
      </span>
    </template>
  </multiselect>
</template>

<script>
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'

Vue.component('multiselect', Multiselect)

export default {
  name: 'CategoriesSelect',
  components: { Multiselect },
  data() {
    return {
      localCategories: [],
    }
  },
  props: ['selectedCategories'],
  methods: {
    selectCategory(category) {
      this.$emit('select-category', category)
    },
    removeCategory(event) {
      const categoryId = event.target.dataset.categoryId
      this.localCategories = this.localCategories.filter(cat => cat.id !== categoryId)
      this.$emit('remove-category', categoryId)
    },
    getStyles(color) {
      return `
        background-color: ${color};
      `
    },
  },
  computed: {
    ...mapGetters(['getCategories']),
    returnCategoryTags() {
      return this.selectedCategories.map(catId => this.getCategories.find(cat => cat.id === catId))
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.custom-tag {
  & > section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: min-content;
    margin: 0;

    svg {
      margin-right: 4px;
    }
  }
  i {
    &:hover {
      background-color: transparent;
    }
    &:after {
      color: var(--color-white);
    }
  }
}
</style>
