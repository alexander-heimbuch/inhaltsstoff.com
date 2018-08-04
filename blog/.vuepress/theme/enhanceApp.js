import Vuex from 'vuex'
import moment from 'vue-moment'
import { sync } from 'vuex-router-sync'

import createStore from './store'
import types from './store/types'
import registerDirectives from './directives'

import Layout from './Layout'

export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(Vuex)
  Vue.use(moment)
  registerDirectives(Vue)

  const store = createStore()
  sync(store, router)

  router.addRoutes([
    { path: '/tags/*', component: Layout }
  ])

  router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
      // Start the route progress bar.
      store.commit(types.LOAD_START)
    }
    next()
  })

  router.afterEach(() => {
    // Complete the animation of the route progress bar.
    store.commit(types.LOAD_END)
  })

  options.store = store
}
