import { Send } from 'lucide-react'
import type { Message } from '../../types/Chat.types'

const ChatInput: React.FC<{
  chatType: 'team' | 'bot' | null
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  isSending: boolean
  setIsSending: (sending: boolean) => void
  summaryMode: boolean
  setSummaryMode: (mode: boolean) => void
  inputValue: string
  setInputValue: (value: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}> = ({
  chatType,
  setMessages,
  isSending,
  setIsSending,
  summaryMode,
  setSummaryMode,
  inputValue,
  setInputValue,
  isLoading,
  setIsLoading,
}) => {
  const handleSummaryToggle = () => {
    if (!summaryMode) {
      const userMessage: Message = {
        id: Date.now(),
        text: '요약하기',
        isBot: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      // 로딩 상태 시작
      setIsLoading(true)

      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now(),
          text: '다음과 같이 요약했습니다.\n팀장님 존경해요',
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setSummaryMode(true)
        setInputValue('팀장님 존경해요')
        setIsLoading(false)
      }, 2500)
    } else {
      // 보내기 버튼 클릭 시
      const userMessage: Message = {
        id: Date.now(),
        text: '보내기',
        isBot: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      // 로딩 상태 시작
      setIsLoading(true)

      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now(),
          text: '다음과 같이 요약했습니다.\n\n팀장님 존경해요',
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsSending(true)
        setIsLoading(false)
      }, 2500)
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || isSending) return

    if (chatType === 'team' && summaryMode) {
      setSummaryMode(true)
      setIsSending(true)
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // 로딩 상태 시작
    setIsLoading(true)

    // 봇 응답 시뮬레이션
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text:
          chatType === 'team'
            ? summaryMode
              ? '팀장님께 이야기를 전달드렸어요.\n오늘 하루도 수고 많으셨어요.'
              : '그러셨군요. 지영 님의 마음 이해해요.'
            : '점수가 만족스럽지 않으신가 봐요.\n그래도 평균 이상으로 점수가 나왔으니 충분히 잘하셨어요.',
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false) // 로딩 상태 종료
    }, 3000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {chatType && (
        <div className="p-3 pb-4 pt-0">
          {/* 요약하기/보내기 버튼 (팀장님께 이야기 모드일 때만) */}
          {chatType === 'team' && (
            <div className="mb-2 flex">
              {!summaryMode || isSending ? (
                isSending ? null : (
                  <button
                    onClick={handleSummaryToggle}
                    disabled={isSending || isLoading}
                    className={`w-2/5 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ml-[auto] ${
                      !summaryMode
                        ? 'bg-white text-[#A06DFF] border-2 border-[#A06DFF] hover:bg-[#A06DFF] hover:text-white active:scale-95'
                        : isSending
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#E3D4FF] to-[#A06DFF] text-white hover:from-[#D4C4FF] hover:to-[#9A5CFF] active:scale-95'
                    } shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {!summaryMode
                      ? '요약하기'
                      : isSending
                      ? '전송 완료'
                      : '보내기'}
                  </button>
                )
              ) : (
                <div className="font-semibold text-sm mb-1">
                  [ 팀장님께 이야기 전달하기 ]
                </div>
              )}
            </div>
          )}

          {/* 입력창 */}
          <div className="flex items-center space-x-2  bg-gray-50">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSending || isLoading}
              placeholder="AI 챗봇에게 이야기를 들려주세요"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#A06DFF] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isSending || isLoading}
              className="w-10 h-10 bg-gradient-to-r from-[#E3D4FF] to-[#A06DFF] rounded-full flex items-center justify-center hover:from-[#D4C4FF] hover:to-[#9A5CFF] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatInput
