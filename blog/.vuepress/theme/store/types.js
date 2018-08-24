const types = [
  'SITE_UPDATE',
  'PAGE_UPDATE',
  'TOGGLE_SIDEBAR',
  'LOAD_START',
  'LOAD_END',
  'SET_VIEWPORT'
]

const registeredTypes = types.reduce((result, type) => ({ ...result, [type]: type }), {})

export default registeredTypes
