import { PeerEvaluation, PeerInfo } from '.'

interface TeamMember {
  name: string
  company: string
  role: string
  email: string
  project: string
  projectPeriod: string
  avatar: string
}

const PeerEvaluationContent: React.FC = () => {
  const teamMember: TeamMember = {
    name: '신택수',
    company: 'SKoro 부서 팀원',
    role: 'Backend Engineer',
    email: 'novventa@naver.com',
    project: 'AI powered ITS 혁신',
    projectPeriod: '2025.05.04 ~ 2025.07.03',
    avatar: '👨‍💻',
  }

  return (
    <div className="flex gap-6 h-full">
      <PeerInfo teamMember={teamMember} />
      <PeerEvaluation />
    </div>
  )
}

export default PeerEvaluationContent
