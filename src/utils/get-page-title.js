import {APP_SETTINGS} from '@/config'

const title = APP_SETTINGS.title || 'Vue Element Admin'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
