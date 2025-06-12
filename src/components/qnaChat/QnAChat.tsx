import { useState } from 'react'
import ChatButton from './ChatButton'
import { ChatHeader, ChatContent, ChatInput } from '.'
import type { Message } from '../../types/Chat.types'

const QnAChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [chatType, setChatType] = useState<'team' | 'bot' | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [summaryMode, setSummaryMode] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseChat = () => {
    setIsOpen(false)
    setChatType(null)
    setMessages([])
    setSummaryMode(false)
    setIsSending(false)
    setIsLoading(false)
  }

  return (
    <>
      <ChatButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setMessages={setMessages}
        handleCloseChat={handleCloseChat}
      />
      {isOpen && (
        <div className="fixed bottom-[7rem] right-10 z-50">
          <div className="w-96 h-[600px] bg-gray-50 rounded-2xl shadow-md flex flex-col overflow-hidden border border-gray-300 ">
            <ChatHeader handleCloseChat={handleCloseChat} />

            <ChatContent
              messages={messages}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              chatType={chatType}
              setChatType={setChatType}
              setMessages={setMessages}
            />

            {chatType && (
              <ChatInput
                chatType={chatType}
                setMessages={setMessages}
                isSending={isSending}
                setIsSending={setIsSending}
                summaryMode={summaryMode}
                setSummaryMode={setSummaryMode}
                inputValue={inputValue}
                setInputValue={setInputValue}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default QnAChat
