import { Report } from '../common'
import { ScoreEvaluation, TeamList } from '../evaluationPage'
import { useLocation } from 'react-router-dom'

const MemberEvaluationContent: React.FC = () => {
  const location = useLocation()
  const member = location.state?.member

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TeamList />

      <main className="flex-1 flex flex-col lg:flex-row pb-5 px-10 min-h-0 min-h-[fit-content] lg:min-h-[auto]">
        <Report type="memberEvaluation" memberName={member.name} />
        <ScoreEvaluation />
      </main>
    </div>
  )
}

export default MemberEvaluationContent
