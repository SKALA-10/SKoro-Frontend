import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { FinalEvaluationContent } from '../components/evaluationPage'

const FinalEvaluationPage: React.FC = () => {
  useDocumentTitle('최종 평가 프로세스 - SKoro')

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="분기별 피드백 레포트" />
      <FinalEvaluationContent />
    </div>
  )
}

export default FinalEvaluationPage
