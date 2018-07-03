export default () => {
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('data-src')

    if (!src) {
      return
    }

    img.setAttribute('src', src)
    img.removeAttribute('data-src')
  })
}
