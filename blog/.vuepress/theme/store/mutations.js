import { pick, get } from 'lodash'

import types from './types'
import { extractPosts, extractPages, formatPages, formatPage } from './utils'

export default {
  [types.SITE_UPDATE]: (state, site) => {
    state.blog = pick(site, ['title', 'description', 'base'])

    state.navigation.posts = extractPosts(site.pages)
    state.navigation.pages = extractPages(site.pages)
    state.index = formatPages(get(site, 'pages', []))
  },

  [types.PAGE_UPDATE]: (state, page) => {
    state.current = formatPage(page)
  },

  [types.TOGGLE_SIDEBAR]: (state, sidebarState) => {
    state.navigation.open = sidebarState
  },

  [types.LOAD_START]: state => {
    state.loading = true
  },

  [types.LOAD_END]: state => {
    state.loading = false
  },

  [types.SET_VIEWPORT]: (state, viewport) => {
    state.viewport = viewport
  }
}
