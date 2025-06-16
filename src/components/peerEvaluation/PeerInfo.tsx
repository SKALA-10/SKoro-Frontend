import { Avatar } from '../common'

interface TeamMember {
  name: string
  company: string
  role: string
  email: string
  project: string
  projectPeriod: string
  avatar: string
}

const PeerInfo: React.FC<{
  teamMember: TeamMember
}> = ({ teamMember }) => {
  return (
    <div className="w-60 bg-gray-50 flex flex-col">
      <h2 className="font-semibold mb-2">팀원 정보</h2>

      <section className="relative bg-white rounded-xl shadow-md p-6 flex-1 pt-10">
        <div className="text-center mb-6 ">
          <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
            <Avatar
              avatar={teamMember.avatar}
              size="xl"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-1">{teamMember.name}</h3>
          <p className="text-sm">{teamMember.company}</p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-2">담당 업무</p>
            <p className="text-sm">{teamMember.role}</p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">이메일</p>
            <p className="text-sm">{teamMember.email}</p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">함께 진행한 프로젝트</p>
            <p className="font-medium text-sm mb-1">{teamMember.project}</p>
            <p className="text-xs">{teamMember.projectPeriod}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PeerInfo
