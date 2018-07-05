<template>
  <article class="card container">
    <div class="preview row" :style="{'background-image': 'url(' + data.image + ')'}">
      <div class="columns preview-bar" :class="data.classes">
        <h2 class="headline-medium preview-headline">
          <router-link :to="data.path">{{ data.title }}</router-link>
        </h2>

        <div class="category-list">
          in <tag v-for="(tag, index) in tags" :tag="tag" :last="index >= tags.length - 1"></tag>
        </div>

        <div class="meta">
          <span class="author">{{ data.author }}</span> am
          <span class="time" v-if="data.publish">{{ data.publish | moment('DD.MM.YYYY') }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import Tag from './Tag'

export default {
  components: { Tag },
  props: ['data'],
  computed: {
    tags() {
      return [this.data.category, ...this.data.tags].map(tag => [this.data.category, tag])
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../styles/variables'
  @import '../styles/mixins'

  @include desktop
    .card
      height: 100vh
      min-width: $card-min-width
      max-width: $card-max-width

      .preview
        position: relative
        height: 100%
        background-size: auto 130%
        background-position: center center

      .preview-bar
        position: absolute
        padding: $padding
        bottom: 0
        width: 100%

      .preview-headline
          height: 1.4em * 3

  @include mobile
    .card
      width: 100% !important
      height: 100vh

      .preview
        position: relative
        height: 100%
        background-size: auto 130%
        background-position: center center

      .preview-bar
        position: absolute
        padding: $padding
        bottom: 0
        width: 100%

      .preview-headline
        height: 1.4em * 3

</style>
