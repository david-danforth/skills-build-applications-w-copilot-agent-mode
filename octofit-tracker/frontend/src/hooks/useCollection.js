import { useEffect, useState } from 'react'

export function useCollection(endpoint, fetcher) {
  const [state, setState] = useState({
    items: [],
    error: '',
    loading: true,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setState({ items: [], error: '', loading: true })

      try {
        const items = await fetcher(endpoint, controller.signal)
        setState({ items, error: '', loading: false })
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            items: [],
            error: error instanceof Error ? error.message : 'Unable to load data.',
            loading: false,
          })
        }
      }
    }

    loadItems()
    return () => controller.abort()
  }, [endpoint, fetcher])

  return state
}
