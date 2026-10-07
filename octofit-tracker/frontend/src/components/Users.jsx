import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const fields = [
  { name: 'name', label: 'Athlete' },
  { name: 'email', label: 'Email' },
  { name: 'age', label: 'Age' },
  { name: 'fitnessLevel', label: 'Fitness level' },
  { name: 'teamId', label: 'Team' },
]

function Users() {
  return (
    <ResourcePage
      description="Browse athlete profiles and fitness levels."
      endpoint="/api/users/"
      fetcher={fetch}
      fields={fields}
      title="Users"
    />
  )
}

export default Users
