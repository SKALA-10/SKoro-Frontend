import { evaluations } from '../../dummy/dashboart'

const Evaluations = () => {
  return (
    <div className="h-1/2 flex flex-col pt-2">
      <h2 className="font-semibold mb-2">팀 분기 평가</h2>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 max-h-96 overflow-y-auto p-2">
        {evaluations.map((evaluation, index) => (
          <div
            key={index}
            className="border-b border-gray-200 last:border-b-0 hover:shadow-md transition-shadow duration-200 cursor-pointer p-4 py-3 rounded-sm"
          >
            <div className="flex justify-between items-start mb-2 items-center">
              <div>
                <span className="text-xs text-blue-600 font-semibold">
                  {evaluation.date}
                </span>
                <h3 className="font-semibold text-gray-800">
                  {evaluation.title}
                </h3>
              </div>

              <div className="text-right font-semibold bg-gray-50 rounded-md p-3 py-2 w-[fit-content]">
                <div className="flex space-x-4 text-xs text-gray-600">
                  <span>전년 유사팀 대비 성과</span>
                  <span
                    className={
                      evaluation.yearOverYear > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {evaluation.yearOverYear > 0 ? '+' : ''}
                    {evaluation.yearOverYear}%
                  </span>
                </div>

                <div className="flex space-x-4 text-xs text-gray-600 mt-1">
                  <span>전년도 대비 성과 추이</span>
                  <span
                    className={
                      evaluation.previousYear > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {evaluation.previousYear > 0 ? '+' : ''}
                    {evaluation.previousYear}%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-1">
              {evaluation.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="w-3/4 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${evaluation.progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {evaluation.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Evaluations
