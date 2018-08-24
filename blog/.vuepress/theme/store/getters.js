import { getOr } from 'lodash/fp'
import { get, orderBy, toLower } from 'lodash'

import { relativePath } from './utils'

export default {
  blog: getOr({}, 'blog'),
  current: getOr({}, 'current'),
  index: getOr({}, 'index'),
  loading: getOr(false, 'loading'),
  viewport: getOr('desktop', 'viewport'),

  navigation: state => ({
    open: get(state, 'navigation.open', false),
    classes: {
      open: get(state, 'navigation.open', false),
      ...get(state, 'current.classes', {})
    },
    posts: get(state, 'navigation.posts', []),
    pages: get(state, 'navigation.pages', [])
  }),

  layout: state => {
    const route = get(state, 'route.path', '')
    const path = relativePath(state)
    const type = get(state, ['index', route, 'type'])
    const [group] = path.split('/').filter(tag => !!tag)

    if (type) {
      return type
    }

    if (group === 'tags') {
      return 'tags'
    }

    return 'home'
  },

  tags: state => {
    const path = relativePath(state)
    const [group, ...tags] = path.split('/').filter(tag => !!tag)
    return group === 'tags' ? tags : []
  },

  posts: state => (tags = []) => {
    const items = Object.keys(state.index)
        .map(item => state.index[item])
        .filter(({ type }) => type === 'post')
        .filter(post => tags.every(tag => ~[...post.tags, post.category].map(toLower).indexOf(tag)))

    return orderBy(items, ['publish'], ['desc'])
  }
}
