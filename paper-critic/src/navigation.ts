export function navigateTo(path: string) {
  if (path === window.location.pathname) return
  window.history.pushState({}, '', path)
  window.dispatchEvent(new CustomEvent('customnavigation'))
}
