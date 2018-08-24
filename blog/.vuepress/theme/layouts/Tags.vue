<template>
  <card-list :tags="tags"></card-list>
</template>

<script>
import { mapGetters } from 'vuex'
import CardList from '../partials/CardList'

export default {
  components: { CardList },
  computed: {
    ...mapGetters(['tags'])
  }
}
</script>
