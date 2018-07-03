import {
  get
} from 'lodash'

import {
  reduce,
  map,
  compose,
  filter,
  has,
  toLower
} from 'lodash/fp'

const generateTags = (category = {}, item) => [].concat(item.tags).reduce((result, tag) => {
  if (tag === item.category) {
    return result
  }

  return {
    ...result,
    [tag]: [
      ...result[tag] || [],
      item
    ]
  }
}, category)

const tagClasses = compose(
  reduce((result, item) => ({ ...result,
    [item]: true
  }), {}),
  map(toLower),
  map(tag => `content-${tag}`),
  filter(tag => !!tag),
  item => [...item.tags || [], item.category]
)

const pluckData = compose(
  item => ({ ...item, classes: tagClasses(item) }),
  ({
    frontmatter,
    path,
    title
  }) => ({
    ...frontmatter,
    path,
    title,
    publish: frontmatter.publish ? new Date(frontmatter.publish).getTime() : null,
    tags: get(frontmatter, 'tags', []).map(toLower)
  }))

const extractCategories = reduce((result, item) => ({
  ...result,
  [item.category]: generateTags(result[item.category], item)
}), {})

export const extractPosts = compose(
  extractCategories,
  filter(has('tags')),
  filter(item => item.type === 'post'),
  filter(has('category')),
  map(pluckData)
)

export const extractPages = compose(
  filter(item => item.type === 'page'),
  map(pluckData)
)

export const formatPages = reduce((result, page) => ({
  ...result,
  [page.path]: pluckData(page)
}), {})

export const formatPage = pluckData

export const relativePath = state => {
  const route = get(state, 'route.path', '/')
  const base = get(state, 'blog.path', '')

  return route.replace(base, '')
}
