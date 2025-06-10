import { useState } from 'react'
import { Edit2, X } from 'lucide-react'

const ScoreEvaluation = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [finalScore, setFinalScore] = useState(3.8)
  const [editScore, setEditScore] = useState<number | null>(3.8)
  const [editReason, setEditReason] = useState('')
  const [finalComment, setFinalComment] =
    useState(`항상 맡은 일을 책임감 있게 수행하며, 팀워크에도 기여도가 높습니다. 주어진 과제 이상으로 고민하고, 더 나은 방향을 제안하는 태도가 인상적입니다.

아직 경험은 많지 않지만, 빠르게 배우고 적응하는 모습이 인상 깊습니다. 스스로 학습하며 성장하려는 태도가 뛰어나 향후 발전이 더욱 기대됩니다.`)

  const handleScoreChange = (value: string) => {
    if (value === '') {
      setEditScore(null)
      return
    }

    const numValue = parseFloat(value)

    const isInRange = numValue >= 1.0 && numValue <= 5.0
    const isStepValid = Number.isInteger(numValue * 10) // 0.1 단위 체크

    if (!isNaN(numValue) && isInRange && isStepValid) {
      setEditScore(numValue)
    }
  }

  const handleSave = () => {
    if (editScore && finalComment.trim() && editReason.trim()) {
      setFinalScore(editScore)
      setIsEditing(false)
      setEditReason('')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditScore(finalScore)
    setEditReason('')
  }

  const isFormValid =
    (editScore && finalComment.trim() && editReason.trim()) ||
    (!isEditing && finalComment.trim())

  return (
    <div className="lg:pl-4 w-fill lg:w-96 flex flex-col">
      <div className="mb-4 mt-4 lg:mt-0">
        <h2 className="font-semibold">점수 책정</h2>
      </div>

      {/* 최종 점수 및 편집 버튼 */}
      <div className="bg-white rounded-xl px-5 py-4 mb-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            최종 점수
          </h3>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <span className="font-medium">{finalScore} 점</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit2 size={16} className="text-gray-500" />
                </button>
              </>
            ) : (
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* 점수 수정 시 입력란 */}
        {isEditing && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                수정 점수
              </label>
              <input
                type="number"
                min="1.0"
                max="5.0"
                step="0.1"
                value={editScore !== null ? editScore : ''}
                onChange={(e) => handleScoreChange(e.target.value)}
                className="w-full px-3 py-2 border-none rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm bg-[#F8F8F8]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                수정 이유
              </label>
              <textarea
                value={editReason}
                onChange={(e) => setEditReason(e.target.value)}
                placeholder="최종 점수 수정 이유를 작성해주세요"
                rows={1}
                className="w-full px-3 py-2 border-none rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-sm bg-[#F8F8F8]"
              />
            </div>
          </div>
        )}
      </div>

      {/* 최종평가 코멘트 */}
      <div className="bg-white rounded-xl px-5 py-4 mb-6 shadow-md flex-1 flex flex-col min-h-64 lg:min-h-0">
        <h3 className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          최종평가 코멘트
        </h3>
        <textarea
          value={finalComment}
          onChange={(e) => setFinalComment(e.target.value)}
          className="w-full px-3 py-2 border-none rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-gray-700 flex-1 text-sm bg-[#F8F8F8]"
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all h-12 mt-auto ${
            isFormValid
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          평가 저장하기
        </button>
        <button className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-500 hover:bg-gray-600 text-white transition-colors h-12 mt-auto">
          최종 제출
        </button>
      </div>
    </div>
  )
}

export default ScoreEvaluation
