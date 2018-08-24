import types from './types'

const viewport = ({ commit }) => {
  const getViewport = () => {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

    if (width >= 1400) {
      return 'widescreen'
    }

    if (width >= 1200) {
      return 'desktop'
    }

    return 'mobile'
  }

  window.addEventListener('resize', () => {
    commit(types.SET_VIEWPORT, getViewport())
  })

  // initial
  commit(types.SET_VIEWPORT, getViewport())
}

export default [viewport]
