import { Report } from '../common'
import { TeamList } from '../evaluationPage'

const FinalEvaluationContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TeamList />

      <main className="flex-1 flex flex-col pb-5 px-10 min-h-0 min-h-[fit-content] lg:min-h-[auto]">
        <Report type="evaluation" />
      </main>
    </div>
  )
}

export default FinalEvaluationContent
