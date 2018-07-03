import types from './types'

export default ({
  updateSite: ({ commit }, site) => commit(types.SITE_UPDATE, site),
  updatePage: ({ commit }, page) => commit(types.PAGE_UPDATE, page),
  toggleSidebar: ({ commit, state }) => commit(types.TOGGLE_SIDEBAR, !state.navigation.open)
})
