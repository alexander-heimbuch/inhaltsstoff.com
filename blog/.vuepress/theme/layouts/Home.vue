<template>
  <div class="cards">
    <card v-for="item in items" :data="item" :style="{ width: `${100 / items.length}%` }"></card>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'

import Card from '../partials/Card'

export default {
  components: { Card },
  computed: {
    ...mapGetters(['posts']),
    items() {
      return this.posts([])
    }
  }
}
</script>

<style lang="sass" scoped>
  .cards
    display: flex
</style>