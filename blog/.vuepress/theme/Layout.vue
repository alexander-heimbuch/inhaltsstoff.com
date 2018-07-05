<template>
  <div class="layout">
    <preloader></preloader>
    <sidebar></sidebar>
    <main>
      <component :is="layout"></component>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Home from './layouts/Home'
import Tags from './layouts/Tags'
import Post from './layouts/Post'
import Page from './layouts/Page'
import Sidebar from './Sidebar'
import Preloader from './partials/Preloader'

export default {
  components: { Home, Post, Page, Sidebar, Tags, Preloader },
  computed: mapGetters(['layout']),
  methods: mapActions(['updateSite', 'updatePage']),
  watch: {
    $page() {
      this.updatePage(this.$page)
    }
  },
  mounted() {
    this.updatePage(this.$page)
    this.updateSite(this.$site)
  }
}
</script>

<style lang="sass">
  @import 'styles/global'
  @import 'styles/text'
  @import 'styles/mixins'
  @import 'styles/tags'
  @import 'styles/icons'
  @import 'styles/transitions'

  @include mobile
    body
      height: 100%
      min-height: 100vh
      width: 100%

  @include desktop
    body
      display: flex
      height: 100%
      min-height: 100vh
      width: 100%
      overflow: hidden

    main
      width: 100%

    .layout
      display: flex

    .content
      min-height: 100vh

      &.slices
        width: 100%
        position: relative
        display: flex
        justify-content: center
</style>
