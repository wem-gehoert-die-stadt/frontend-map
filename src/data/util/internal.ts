export const detectInternalFromUrl = (): boolean =>
  window.location.href.toLowerCase().includes('secret=')

export const getSecretFromUrl = (): string =>
  new URLSearchParams(window.location.search).get('secret')
