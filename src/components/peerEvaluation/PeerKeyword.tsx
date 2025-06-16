import { X } from 'lucide-react'
import { keywordOptions } from '../../constants/peerEvaluation'

const PeerKeyword: React.FC<{
  selectedKeywords: string[]
  customKeywords: string[]
  onCustomKeywordRemove: (keyword: string) => void
  onAdditionalKeywords: (e: React.FormEvent<HTMLFormElement>) => void
  onSubmit: () => void
  onKeywordToggle: (keyword: string) => void
}> = ({
  selectedKeywords,
  customKeywords,
  onCustomKeywordRemove,
  onAdditionalKeywords,
  onSubmit,
  onKeywordToggle,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-blue-600 mb-1">
          키워드 선택
        </h2>
        <h3 className="text-xl font-semibold">
          동료에게 어울리는 키워드를 선택해주세요. (다중선택 가능)
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-8">
        {keywordOptions.map((keyword) => (
          <button
            key={keyword}
            onClick={() => onKeywordToggle(keyword)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              selectedKeywords.includes(keyword)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            {keyword}
          </button>
        ))}
      </div>

      <div className="">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-blue-600 mb-1">
              키워드 추가 (최대 5개, 20자 이내 가능)
            </h4>
            <p className="text-xl font-semibold mb-4">
              추가하고 싶은 키워드를 입력하세요.
            </p>
          </div>

          <form className="relative" onSubmit={onAdditionalKeywords}>
            <input
              type="text"
              placeholder="키워드를 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              type="submit"
            >
              <span className="text-xl">+</span>
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {customKeywords.map((keyword) => (
            <div
              key={keyword}
              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              <span className="text-sm">{keyword}</span>
              <button
                onClick={() => onCustomKeywordRemove(keyword)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-auto">
        <button
          onClick={onSubmit}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
        >
          평가 저장하기
        </button>
      </div>
    </div>
  )
}

export default PeerKeyword
