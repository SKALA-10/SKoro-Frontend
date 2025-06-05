import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { FeedbackContent } from '../components/feedbackPage'

const FeedbackPage: React.FC = () => {
  useDocumentTitle('분기별 피드백 - SKoro')

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="분기별 피드백 레포트" />
      <FeedbackContent />
    </div>
  )
}

export default FeedbackPage
