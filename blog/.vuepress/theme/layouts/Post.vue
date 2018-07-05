<template>
  <article class="container single-article">
    <div v-if="current.image" class="background-image" :style="{'background-image': `url('${$withBase(current.image)}')`}"></div>

    <div class="article-intro row">
      <div class="columns intro-bar" :class="current.classes">
        <h1 class="intro-headline">{{ current.title }}</h1>
        <div class="meta">
          <span class="author">{{ current.author }}</span>
          <span class="time" v-if="current.publish">&nbsp;am {{ current.publish | moment('DD.MM.YYYY') }}</span>
          <span class="tags">
            in <tag v-for="(tag, index) in tags" :tag="tag" :last="index >= tags.length - 1"></tag>
          </span>
        </div>
      </div>
    </div>
    <div v-if="current.image" class="article-image" :style="{'background-image': `url('${$withBase(current.image)}')`}"></div>
    <div class="row article-content">
      <div class="columns content"><Content /></div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

import Tag from '../partials/Tag'

export default {
  computed: {
    ...mapGetters([ 'current' ]),
    tags() {
      return [this.current.category, ...this.current.tags]
    }
  },
  components: { Tag }
}
</script>

<style lang="sass">
@import '../styles/variables'
@import '../styles/mixins'
@import '../styles/text'

.content
  max-width: $content-max-width

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
  .single-article
    padding: $padding * 2 0
    height: 100vh
    overflow-y: auto

    .row
      margin-bottom: $margin * 3

    .meta
      margin: ($margin / 4) 0 0 ($margin / 4)

    .article-image
      display: none

    .background-image
      position: fixed
      z-index: -1
      width: 100%
      height: 100%
      top: 0
      left: 0
      background-size: cover

      &:before
        position: absolute
        content: ''
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: $color-background
        opacity: 0.85

    .article-content, .article-intro, .article-comments
      width: 90%
      margin: 0 auto

    .article-intro
      margin-bottom: $margin * 2

      .intro-headline
        margin-bottom: 0
        line-height: $padding * 2

      .intro-bar
        background-color: transparent !important

    .article-content
      .article-image
        @include visually-hidden

      margin-bottom: $margin * 3

@include mobile
  .single-article
    .intro-bar
      padding: $padding

    .intro-headline
      margin: 0

    .tags
      display: block

    .article-content
      margin: $margin 0

      > *:not(img)
        margin-left: $margin
        margin-right: $margin

      img
        margin: $margin 0

    .background-image
      display: none

    .article-image
      width: 100%
      height: 50vh
      background-repeat: no-repeat
      background-size: cover
      background-position: center center

</style>
