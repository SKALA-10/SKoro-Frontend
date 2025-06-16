import { Header } from '../components/common'
import { Dashboard } from '../components/homePage'
import { MemberInfo } from '../components/memberReportPage'
import useDocumentTitle from '../hooks/useDocumentTitle'

const HomePage: React.FC = () => {
  useDocumentTitle('홈 화면 - SKoro')

  return (
    <div className="flex flex-1 flex-col min-h-0 min-w-0">
      <Header title="홈 화면" />
      <div className="lg:flex-row flex-col flex-1 flex pb-5 px-10 lg:pr-0 min-h-0 mt-[-1rem] gap-5">
        <Dashboard />
        <MemberInfo pageType="home" />
      </div>
    </div>
  )
}

export default HomePage
