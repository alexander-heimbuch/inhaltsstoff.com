<template>
  <div class="sidebar" :class="navigation.classes">
    <transition name="sidebar">
      <div class="row site-headline" key="title" v-if="!navigation.open">
        <span class="text-centered site-title columns">
          <router-link :to="$withBase('/')">{{ blog.title }}</router-link>
        </span>

        <span class="text-centered site-claim columns">{{ blog.description }}</span>
      </div>

      <div class="row navigation-list" key="navigation" v-else>
        <ul class="columns">
          <li class="section" v-for="category in Object.keys(navigation.posts)">
            <h3><router-link :to="$withBase(`/tags/${category.toLowerCase()}`)">{{ capitalize(category) }}</router-link></h3>
            <ul>
              <li v-for="tag in Object.keys(navigation.posts[category])">
                <router-link :to="`/tags/${category.toLowerCase()}/${tag.toLowerCase()}`" class="post">
                  {{ capitalize(tag) }} ({{ navigation.posts[category][tag].length }})
                </router-link>
              </li>
            </ul>
          </li>
          <li class="section" v-for="page in navigation.pages">
            <router-link :to="$withBase(page.path)" class="page">{{ page.title }}</router-link>
          </li>
        </ul>
      </div>
    </transition>

    <button class="icon-menu sidebar-toggle" @click="toggleSidebar()"></button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { capitalize } from 'lodash'

export default {
  computed: {
    ...mapGetters(['blog', 'navigation', 'current'])
  },
  methods: {
    capitalize,
    ...mapActions(['toggleSidebar'])
  }
}
</script>

<style lang="sass" scoped>
  @import 'styles/mixins'
  @import 'styles/text'
  @import 'styles/variables'

  .sidebar-toggle
    cursor: pointer

  @include desktop
    .sidebar
      position: relative
      width: 35%
      min-width: map_get($breakpoints, 'desktop') * 0.35
      min-height: 100vh
      @include flex-center

      .icon-menu
        left: $margin * 2

      .site-headline
        flex-direction: column !important
        opacity: 1
        margin-left: -10px
        transform: translate3d(0, 50%, 0) rotate(-90deg)

        .site-title
          @include headline-font
          font-size: 2.8em
          line-height: 1.2em
          margin-bottom: 0

        .site-claim
          @include headline-font
          font-size: 1.2em
          display: none

        a
          border-bottom: 0

      .navigation-list
        position: absolute
        top: 0
        display: none
        left: 0

        width: 100%
        height: 100%
        @include flex-center

        z-index: $navigation-level
        position: absolute
        padding: $padding 0

        h3
          @include headline-font
          font-size: 1.4em
          padding-right: $padding * 2

        .section
          @include flex-center
          margin-bottom: $margin * 2

        ul
          margin: 0
          padding: 0

        li
          display: block
          margin-left: $margin
          margin-bottom: $margin / 2

      &:not(.open)
        min-width: $small-header-width
        width: $small-header-width

      .sidebar-toggle
        position: absolute
        width: $menu-icon-size
        height: $menu-icon-size
        z-index: $menu-icon-level
        background-color: $color-text
        top: $margin * 2
        left: $margin * 2

  @include widescreen
    .sidebar
      .site-headline
        transform: none
        margin-left: 0

        .site-claim
          display: block

      &:not(.open)
        min-width: map_get($breakpoints, 'desktop') * 0.35
        width: 35%

        .site-headline
          margin-left: 0

  @include mobile
    .sidebar
      position: relative
      z-index: $header-level
      background: transparent !important
      height: $mobile-menu-height

      &.open
        height: 100vh

      .site-headline
        position: relative
        padding: $padding * 2 0 $padding 0
        text-align: center

        .site-title
          @include headline-font
          font-size: 2.2em

        a
          border-bottom: 0

        h1
          margin: 0
          padding: 0 ($padding * 3)

          font-size: 1.6em
          font-weight: 500

          @include ellipsis

      .site-claim
        @include visually-hidden

      .navigation-list
        text-align: right;
        overflow: hidden
        padding: $padding * 2 0

        ul
          margin: $menu-icon-size * 2 0 $margin 0
          padding: 0
          list-style: none

        li
          padding: 0
          margin-bottom: $margin
          padding-right: $padding * 2

        .section
          display: block
          margin-bottom: $margin

          h3
            font-weight: 500

          ul
            margin-top: $margin / 2

      .sidebar-toggle
        position: absolute
        width: $menu-icon-size
        height: $menu-icon-size
        right: $margin
        top: $padding * 2
        background-color: $color-text

</style>

