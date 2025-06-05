import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom'
import { FeedbackPage, HomePage, LoginPage, TeamPage } from './pages'
import { Navbar } from './components/navbar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

const AppLayout = () => {
  return (
    <div className="flex h-screen ">
      <Navbar />
      <div className="flex-1 flex flex-col md:ml-0 mt-16 md:mt-0 ">
        <Outlet />
      </div>
    </div>
  )
}
