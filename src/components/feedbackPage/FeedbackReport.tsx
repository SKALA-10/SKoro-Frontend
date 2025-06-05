import { Download } from 'lucide-react'

const FeedbackReport: React.FC<{
  selectedYear: string
  selectedRating: string
}> = ({ selectedYear, selectedRating }) => {
  return (
    <section className="flex-1 flex flex-col items-start">
      <div className="mt-[-8px] flex w-full justify-between items-center">
        <h2 className="font-semibold">
          {selectedYear} {selectedRating} 피드백
        </h2>

        <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center">
          <Download className="inline-block w-5" />
        </button>
      </div>

      <article className="mt-2 flex-1 w-full bg-white p-5 rounded-xl shadow-md"></article>
    </section>
  )
}

export default FeedbackReport
