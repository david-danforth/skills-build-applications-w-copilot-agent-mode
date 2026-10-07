import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const fields = [
  { name: 'name', label: 'Team' },
  { name: 'description', label: 'About' },
  { name: 'memberIds', label: 'Members' },
]

function Teams() {
  return (
    <ResourcePage
      description="Meet the teams and see who is moving together."
      endpoint="/api/teams/"
      fetcher={fetch}
      fields={fields}
      title="Teams"
    />
  )
}

export default Teams
