export default Vue => {
  const toggleLoading = className => el => {
    el.classList.add(className)

    setTimeout(() => {
      el.classList.remove(className)
    }, 1200)
  }

  Vue.directive('loading', {
    bind: toggleLoading('initial'),
    update: toggleLoading('loading')
  })
}