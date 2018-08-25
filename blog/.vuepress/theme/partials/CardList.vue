<template>
  <div class="card-list">
    <div class="previous-cards navigation" v-if="(upperBound - lowerBound > 0) && lowerBound > 0" @click="previousPage()"><span class="icon-next icon-previous navigation-button"></span></div>
    <div class="cards" v-animate-navigate>
      <card v-for="(item, index) in visibleItems" :data="item" :key="index" :style="{ width: cardWidth }"></card>
    </div>
    <div class="next-cards navigation" v-if="items.length > upperBound" @click="nextPage()"><span class="icon-next navigation-button"></span></div>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'

import Card from './Card'

export default {
  props: ['tags', 'count'],

  data () {
    return {
      page: 0,
      cardsCount: this.count || 4
    }
  },

  components: { Card },

  computed: {
    ...mapGetters([ 'posts', 'navigation', 'viewport' ]),
    items () {
      return this.posts(this.tags || [])
    },
    upperBound () {
      return (this.page + 1) * this.cardsCount
    },
    lowerBound () {
      return this.page * this.cardsCount
    },
    visibleItems () {
      return this.items.slice(this.lowerBound, this.upperBound)
    },
    cardWidth () {
      return (100 / this.visibleItems.length > (100 / this.cardsCount)) ? `${100 / this.visibleItems.length}%` : `${100 / this.cardsCount}%`
    }
  },

  methods: {
    nextPage () {
      this.page = this.page + 1
    },
    previousPage () {
      this.page = this.page - 1
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../styles/variables'
  @import '../styles/mixins'

  .card-list
    position: relative

  .cards
    display: flex

  .navigation
    position: absolute
    top: 0
    height: 100%
    z-index: 999
    background: $color-background
    width: $menu-icon-size * 1.5
    display: flex;
    align-items: center
    justify-content: center
    cursor: pointer
    opacity: 0
    transition: opacity $duration

    &:hover
      opacity: 1

  .previous-cards
    left: 0

  .next-cards
    right: 0

  .navigation-button
    display: block;
    width: $menu-icon-size
    height: $menu-icon-size
    z-index: $menu-icon-level
    background-color: rgba($color-text, 0.8)

  .icon-previous
    transform: rotate(180deg)

  @include mobile
    .navigation
      display: none

    .cards
      flex-direction: column

</style>
