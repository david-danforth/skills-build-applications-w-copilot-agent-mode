import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

function Home() {
  return (
    <section className="text-center py-5">
      <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
      <p className="lead text-secondary">
        Track activities, support your team, and celebrate your progress.
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
        {navigation.map(({ label, path }) => (
          <NavLink className="btn btn-outline-primary" key={path} to={path}>
            Browse {label}
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </NavLink>
          <nav aria-label="Main navigation" className="navbar-nav flex-row flex-wrap">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-2${isActive ? ' active fw-semibold' : ''}`
                }
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 flex-grow-1">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Home />} path="*" />
        </Routes>
      </main>

      <footer className="border-top py-3 text-center text-secondary small">
        Mergington High School · Move together, grow together
      </footer>
    </div>
  )
}

export default App
