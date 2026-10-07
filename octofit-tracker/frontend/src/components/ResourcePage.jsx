import { useCollection } from '../hooks/useCollection.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '—'
    }

    return value
      .map((item) => {
        if (item && typeof item === 'object') {
          if ('name' in item && 'sets' in item && 'reps' in item) {
            return `${item.name} (${item.sets} × ${item.reps})`
          }
          return item.name ?? item.email ?? item._id ?? JSON.stringify(item)
        }
        return String(item)
      })
      .join(', ')
  }

  if (typeof value === 'object') {
    return value.name ?? value.email ?? value._id ?? JSON.stringify(value)
  }

  if (typeof value === 'string' && /^\d{4}-\d\d-\d\dT/.test(value)) {
    const date = new Date(value)
    return Number.isNaN(date.valueOf()) ? value : date.toLocaleString()
  }

  return String(value)
}

function getFieldValue(item, field) {
  return field.split('.').reduce((value, key) => value?.[key], item)
}

function ResourcePage({ endpoint, fields, title, description, fetcher }) {
  const { items, error, loading } = useCollection(endpoint, fetcher)

  return (
    <section>
      <div className="mb-4">
        <h1 className="h2 mb-2">{title}</h1>
        <p className="text-secondary">{description}</p>
      </div>

      {loading && (
        <div className="text-secondary" role="status">
          <span aria-hidden="true" className="spinner-border spinner-border-sm me-2" />
          Loading {title.toLowerCase()}…
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-info" role="status">
          No {title.toLowerCase()} found.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                {fields.map(({ label }) => (
                  <th key={label} scope="col">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? item.email ?? `${endpoint}-${index}`}>
                  {fields.map(({ name }) => (
                    <td key={name}>{displayValue(getFieldValue(item, name))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourcePage
