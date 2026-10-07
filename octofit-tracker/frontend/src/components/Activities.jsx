import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const fields = [
  { name: 'userId', label: 'Athlete' },
  { name: 'type', label: 'Activity' },
  { name: 'durationMinutes', label: 'Duration (min)' },
  { name: 'calories', label: 'Calories' },
  { name: 'points', label: 'Points' },
  { name: 'completedAt', label: 'Completed' },
]

function Activities() {
  return (
    <ResourcePage
      description="Review recent workouts and activity points."
      endpoint="/api/activities/"
      fetcher={fetch}
      fields={fields}
      title="Activities"
    />
  )
}

export default Activities
