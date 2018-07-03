<template>
  <transition name="preloader">
    <div class="preloader" v-if="loading">
      <div class="loading-animation">
        <div class="loading-animation-wrapper">
          <ul class="loading-animation-dots">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters(['loading'])
  }
</script>

<style lang="sass" scoped>
  @import '../styles/variables'
  @import '../styles/icons'
  @import '../styles/mixins'

  .preloader-enter-active, .preloader-leave-active
    transition: opacity $duration * 2 linear

    &.preloader-enter
      opacity: 0
    &.preloader-enter-to
      opacity: 1

    &.preloader-leave
      opacity: 1
    &.preloader-leave-to
      opacity: 0

  .preloader
    position: absolute
    width: 100%
    height: 100%
    background: $color-background
    z-index: 30

    top: 0
    left: 0

  .loading-animation
    &:after
      content: ''
      z-index: -1
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0

    .loading-animation-wrapper
      position: absolute
      top: 45%
      bottom: 45%
      left: 25%
      right: 25%

    .loading-animation-dots
      font-size: 97px
      width: 1em
      height: 1em
      position: relative
      margin: 0 auto
      list-style: none
      padding: 0
      border-radius: 50%

      li
        position: absolute
        width: .2em
        height: .2em
        border-radius: 50%

      li:nth-child(1)
        left: 50%
        top: 0
        margin: 0 0 0 -.1em
        background: $color-category-one
        transform-origin: 50% 250%
        animation: rotation 1.3s linear infinite, opacity 4.22s ease-in-out infinite alternate

      li:nth-child(2)
        top: 50%
        right: 0
        margin: -.1em 0 0 0
        background:  $color-category-two
        transform-origin: -150% 50%
        animation: rotation 2.14s linear infinite, opacity 4.93s ease-in-out infinite alternate

      li:nth-child(3)
        left: 50%
        bottom: 0
        margin: 0 0 0 -.1em
        background:  $color-category-three
        transform-origin: 50% -150%
        animation: rotation 1.67s linear infinite, opacity 5.89s ease-in-out infinite alternate

      li:nth-child(4)
        top: 50%
        left: 0
        margin: -.1em 0 0 0
        background:  $color-category-four
        transform-origin: 250% 50%
        animation: rotation 1.98s linear infinite, opacity 6.04s ease-in-out infinite alternate

  @keyframes rotation
    from
    to
      transform: rotate(360deg)

  @keyframes opacity
    0%
    12.0%
      opacity: 0.80
    19.5%
      opacity: 0.88
    37.2%
      opacity: 0.64
    40.5%
      opacity: 0.52
    52.7%
      opacity: 0.69
    60.2%
      opacity: 0.60
    66.6%
      opacity: 0.52
    70.0%
      opacity: 0.63
    79.9%
      opacity: 0.60
    84.2%
      opacity: 0.75
    91.0%
      opacity: 0.87
</style>
