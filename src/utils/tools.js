import defaultSettings from '@/settings'

const title = defaultSettings.Title || 'Admin'

export function getPageTitle(pageTitle) {
    if (pageTitle) {
      return `${pageTitle} - ${title}`
    }
    return `${title}`
}
  
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}