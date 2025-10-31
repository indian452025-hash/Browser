const backBtn = document.getElementById('back')
const forwardBtn = document.getElementById('forward')
const goBtn = document.getElementById('go')
const reloadBtn = document.getElementById('reload')
const urlInput = document.getElementById('url')
const webview = document.getElementById('webview')

function normalizeUrl(input) {
  try {
    const u = new URL(input)
    return u.href
  } catch {
    try {
      return new URL('https://' + input).href
    } catch {
      return ''
    }
  }
}

goBtn.addEventListener('click', () => {
  const href = normalizeUrl(urlInput.value)
  if (href) webview.loadURL(href)
})

urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goBtn.click()
})

backBtn.addEventListener('click', () => {
  if (webview.canGoBack()) webview.goBack()
})

forwardBtn.addEventListener('click', () => {
  if (webview.canGoForward()) webview.goForward()
})

reloadBtn.addEventListener('click', () => {
  webview.reload()
})

// Sync location bar when navigation occurs
webview.addEventListener('did-navigate', (e) => {
  urlInput.value = e.url
})
webview.addEventListener('did-navigate-in-page', (e) => {
  urlInput.value = e.url
})

// Initialize URL input with the initial src
urlInput.value = webview.getAttribute('src') || ''