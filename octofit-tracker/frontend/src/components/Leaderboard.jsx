import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const fields = [
  { name: 'rank', label: 'Rank' },
  { name: 'userId', label: 'Athlete' },
  { name: 'teamId', label: 'Team' },
  { name: 'points', label: 'Points' },
]

function Leaderboard() {
  return (
    <ResourcePage
      description="Celebrate individual effort and friendly competition."
      endpoint="/api/leaderboard/"
      fetcher={fetch}
      fields={fields}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
