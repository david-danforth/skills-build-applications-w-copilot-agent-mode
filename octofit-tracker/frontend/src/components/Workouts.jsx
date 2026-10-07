import { fetchCollection as fetch } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const fields = [
  { name: 'title', label: 'Workout' },
  { name: 'description', label: 'Goal' },
  { name: 'userId', label: 'Athlete' },
  { name: 'exercises', label: 'Exercises' },
]

function Workouts() {
  return (
    <ResourcePage
      description="Find personalized workout ideas for every fitness level."
      endpoint="/api/workouts/"
      fetcher={fetch}
      fields={fields}
      title="Workouts"
    />
  )
}

export default Workouts
