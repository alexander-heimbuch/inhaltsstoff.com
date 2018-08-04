<template>
  <article class="container single-page">
    <div class="page-intro row" v-loading="navigation.open">
      <div class="columns intro-bar">
        <h2 class="headline-medium intro-headline headline-large">{{ current.title }}</h2>
      </div>
    </div>
    <div class="row page-content" v-loading="navigation.open">
      <div class="columns content"><Content /></div>
    </div>
  </article>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters([ 'current', 'navigation' ])
  }
</script>

<style lang="sass" scoped>
  @import '../styles/text'
  @import '../styles/variables'
  @import '../styles/mixins'

  h2, h3, h4
    @include headline-font
    @include headline
    font-size: 1.6em

  ul, ol
    margin-left: $margin * 2
    font-size: 1em

  img
    width: 100%
    display: block
    margin: ($margin * 2) 0

  cite
    padding: $padding
    font-size: 1.1em
    font-weight: 500
    background: rgba($color-text, 0.5)
    color: darken($color-background, 20%)

  @include desktop
    .single-page
      padding: $padding * 2 0
      height: 100vh
      overflow-y: auto

    .row
      margin-bottom: $margin * 3

    .page-content, .page-intro
      width: 90%
      margin: 0 auto

    .page-intro
      margin-bottom: $margin * 2

      .intro-headline
        margin-bottom: 0
        line-height: $padding * 2

      .intro-bar
        background-color: transparent !important

  @include mobile
    .single-page
      padding: $padding $padding * 2

</style>
