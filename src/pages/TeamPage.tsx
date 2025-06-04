import type { User } from '../types/TeamPage.types'
import { TeamContent } from '../components/teamPage'
import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'

const currentUser: User = {
  name: '손지영',
  company: 'SKoro 팀장',
  avatar: '👨‍💼',
}

const TeamPage: React.FC = () => {
  useDocumentTitle('팀 관리 - SKoro')

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="팀 관리 화면" user={currentUser} />
      <TeamContent />
    </div>
  )
}

export default TeamPage
