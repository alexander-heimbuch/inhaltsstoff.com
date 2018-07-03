<template>
  <span>
    <router-link :to="$withBase(`/tags/${path}`)">{{ name }}</router-link>
    <span v-if="!last">,&nbsp;</span>
  </span>
</template>

<script>
import { toLower, capitalize, uniq, last, isArray } from 'lodash'

export default {
  props: ['tag', 'last'],
  methods: { toLower, capitalize },
  computed: {
    path() {
      return uniq([].concat(this.tag)).map(toLower).join('/')
    },
    name() {
      return capitalize(isArray(this.tag) ? last(this.tag) : this.tag)
    }
  }
}
</script>
