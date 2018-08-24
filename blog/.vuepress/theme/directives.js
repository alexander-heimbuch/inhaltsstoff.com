export default Vue => {
  const toggleLoading = className => el => {
    el.classList.add(className)

    setTimeout(() => {
      el.classList.remove(className)
    }, 1200)
  }

  Vue.directive('animate-loading', {
    bind: toggleLoading('initial'),
    update: toggleLoading('loading')
  })

  Vue.directive('animate-navigate', {
    bind: toggleLoading('initial'),
    update: toggleLoading('initial')
  })
}
