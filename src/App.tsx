import { lazy, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { useUserInfoStore } from './store/useUserInfoStore'
import { FinalEvaluationPage } from './pages'
import { MainRoute, ProtectedRoute, LoginGuard } from './components/router'

const pageNames = [
  'HomePage',
  'LoginPage',
  'TeamPage',
  'MemberReportPage',
  'FeedbackPage',
  'FinalPage',
  'PeerEvaluationPage',
  'MemberEvaluationPage',
  'AdminPage',
  'KPIPage',
  'AdminLogicPage',
]

const pages: Record<string, React.LazyExoticComponent<React.FC>> = {}
pageNames.forEach((name) => {
  pages[name] = lazy(() => import(`./pages/${name}`))
})

export const [
  HomePage,
  LoginPage,
  TeamPage,
  MemberReportPage,
  FeedbackPage,
  FinalPage,
  PeerEvaluationPage,
  MemberEvaluationPage,
  AdminPage,
  KPIPage,
  AdminLogicPage,
] = pageNames.map((name) => lazy(() => import(`./pages/${name}`)))

function App() {
  const [userRole, setUserRole] = useState<string | null>(
    useUserInfoStore.getState().role || 'MEMBER'
  )
  const userInfo = sessionStorage.getItem('SKoroUserInfo')
  useEffect(() => {
    if (userInfo) {
      useUserInfoStore.getState().setUserInfo(JSON.parse(userInfo))
      setUserRole(useUserInfoStore.getState().role || 'MEMBER')
    } else {
      useUserInfoStore.getState().logout()
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginGuard />} />
        <Route path="/" element={<MainRoute />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/logic" element={<AdminLogicPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:id" element={<MemberReportPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/final" element={<FinalPage />} />
          <Route
            path="/evaluation"
            element={
              userRole === 'MEMBER' ? (
                <PeerEvaluationPage />
              ) : (
                <FinalEvaluationPage />
              )
            }
          />
          <Route
            path="/evaluation/:id"
            element={
              userRole === 'MEMBER' ? (
                <PeerEvaluationPage />
              ) : (
                <MemberEvaluationPage />
              )
            }
          />
          <Route path="/team-goal" element={<KPIPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
