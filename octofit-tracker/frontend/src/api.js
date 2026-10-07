const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'data', 'items']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  throw new TypeError('The API response did not contain a collection.')
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`)
  }

  return normalizeCollection(await response.json())
}
