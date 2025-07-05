import { useState } from 'react'
import { Report } from '../common'
import { ScoreEvaluation, TeamList } from '../evaluationPage'
import { useLocation } from 'react-router-dom'

const MemberEvaluationContent: React.FC = () => {
  const location = useLocation()
  const [tempEvaluations, setTempEvaluations] = useState<any[]>([])

  const [member, periodId, teamEvaluationId, evaluationReasons] = location.state
    ? [
        location.state.member,
        location.state.periodId,
        location.state.teamEvaluationId,
        location.state.evaluationReasons,
      ]
    : [{ empNo: '', empName: '', profileImage: '' }, 0, null]

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TeamList
        periodId={periodId}
        teamEvaluationId={teamEvaluationId}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />

      <main className="min-h-0 flex-1 flex flex-col lg:flex-row pb-5 px-10 min-h-0 min-h-[fit-content] lg:min-h-0">
        <Report
          type="memberEvaluation"
          memberName={member.empName}
          memberEmpNo={member.empNo}
          evaluationReasons={evaluationReasons}
        />
        <ScoreEvaluation
          memberEmpNo={member.empNo}
          tempEvaluations={tempEvaluations}
          setIsSubmitted={setIsSubmitted}
        />
      </main>
    </div>
  )
}

export default MemberEvaluationContent
