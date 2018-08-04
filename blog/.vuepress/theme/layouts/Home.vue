<template>
  <div class="cards" v-loading="navigation.open">
    <card v-for="(item, index) in items" :data="item" :key="index" :style="{ width: `${100 / items.length}%` }"></card>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'

import Card from '../partials/Card'

export default {
  components: { Card },
  computed: {
    ...mapGetters([ 'posts', 'navigation' ]),
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