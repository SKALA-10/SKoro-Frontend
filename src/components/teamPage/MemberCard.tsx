import { FolderOpen } from 'lucide-react'
import type { TeamMember, MemberCardProps } from '../../types/TeamPage.types'
import { styles, Button } from '.'
import { Avatar } from '../common'

const MemberCard: React.FC<MemberCardProps> = ({ member }) => (
  <article
    className={`${styles.card} p-6 shadow-md relative w-full min-w-0 whitespace-nowrap`}
  >
    <Badge rank={member.rank} className="absolute top-4 right-4" />

    <div className="flex items-end gap-4 mb-4">
      <Avatar size="md" avatar={member.avatar} />
      <div>
        <h3 className={`text-xl ${styles.textSemibold}`}>{member.name}</h3>
        <p className={`${styles.textSmall} mt-1`}>{member.role}</p>
      </div>
    </div>

    <div className="mb-4">
      <div className={`${styles.flexBetween} mb-2`}>
        <span className={`${styles.textSmall} font-bold`}>최종 기여도</span>
        <span className={`${styles.textSmall} font-bold`}>
          {member.contributionRate}%
        </span>
      </div>
      <ProgressBar percentage={member.contributionRate} />
    </div>

    <div className="flex items-stretch justify-between">
      <StatusInfo member={member} />
      <Button
        variant="primary"
        className="flex flex-col items-center gap-1 justify-center px-4 py-2"
      >
        <FolderOpen className="w-5 h-5" />
        <span className={`${styles.textSmall} mt-0.5`}>레포트 보기</span>
      </Button>
    </div>
  </article>
)

export default MemberCard

const Badge: React.FC<{ rank: number; className?: string }> = ({
  rank,
  className = '',
}) => (
  <div
    className={`px-3 h-7 rounded-full bg-[#FFEAB1] ${styles.flexCenter} ${styles.textSmall} ${styles.textSemibold} text-[#F0B100] ${className}`}
  >
    {rank}등
  </div>
)

const ProgressBar: React.FC<{ percentage: number; className?: string }> = ({
  percentage,
  className = '',
}) => (
  <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
    <div
      className="bg-blue-500 h-3 rounded-full transition-all duration-300"
      style={{ width: `${percentage}%` }}
    />
  </div>
)

const StatusInfo: React.FC<{ member: TeamMember }> = ({ member }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      우수: 'text-blue-600',
      보통: 'text-green-600',
      미흡: 'text-orange-600',
    }
    return colors[status as keyof typeof colors] || 'text-gray-600'
  }

  return (
    <div className="bg-gray-100 rounded-lg py-3 px-4 flex-1 mr-3 flex items-center">
      <div className="space-y-2 w-full">
        <div className={styles.flexBetween}>
          <span className={`${styles.textSmall} mr-2`}>역량</span>
          <span
            className={`${styles.textSemibold} ${
              styles.textSmall
            } ${getStatusColor(member.status)}`}
          >
            {member.status}
          </span>
        </div>
        <div className={styles.flexBetween}>
          <span className={`${styles.textSmall} mr-2`}>최종 점수</span>
          <span className={`${styles.textSmall} ${styles.textSemibold}`}>
            {member.currentScore}점
          </span>
        </div>
      </div>
    </div>
  )
}
