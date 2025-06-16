import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PeerEvaluationContent from '../components/peerEvaluation/PeerEvaluationContent'
import { TeamList } from '../components/evaluationPage'

const PeerEvaluationPage: React.FC = () => {
  useDocumentTitle('동료 평가 시스템 - SKoro')

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="동료 평가 시스템" />
      <FinalEvaluationContent />
    </div>
  )
}

export default PeerEvaluationPage

const FinalEvaluationContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TeamList />

      <main className="flex-1 flex flex-col pb-5 px-10 min-h-0 min-h-[fit-content] lg:min-h-[auto]">
        <PeerEvaluationContent />
      </main>
    </div>
  )
}
