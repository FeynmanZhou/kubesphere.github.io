// Make sure there is a language available
export function getLanguage(lang) {
  let formatLang = 'en'

  switch (lang) {
    case 'zh':
    case 'zh-cn':
    case 'zh-CN':
      formatLang = 'zh-CN'
      break
    default:
      break
  }

  return formatLang
}

export function getScrollTop() {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop
}

export function formatAnchor(str) {
  return str
    .replace(/:/g, '')
    .split(' ')
    .join('-')
    .toLowerCase()
}
