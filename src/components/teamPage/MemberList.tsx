import type { TeamMember } from '../../types/TeamPage.types'
import { styles } from '../../components/teamPage/TeamPage.styles'
import MemberCard from './MemberCard'

const MemberList: React.FC<{ members: TeamMember[] }> = ({ members }) => (
  <section className="flex-1 flex flex-col overflow-hidden">
    <h2 className={`${styles.textSemibold} mb-3 flex-shrink-0`}>
      총 {members.length}명
    </h2>

    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 pb-6">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  </section>
)

export default MemberList
