import { FeedbackContent } from '../feedbackPage'
import MemberInfo from './MemberInfo'

const MemberReportContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full min-h-0">
      <FeedbackContent />
      <MemberInfo />
    </div>
  )
}

export default MemberReportContent
