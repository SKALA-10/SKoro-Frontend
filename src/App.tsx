import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage } from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
