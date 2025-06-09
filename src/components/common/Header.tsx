import type { HeaderProps } from '../../types/TeamPage.types'
import { styles, Avatar } from '.'
import { currentUser } from '../../dummy/currentUser'
import { ChevronLeft } from 'lucide-react'

const Header: React.FC<HeaderProps> = ({ title, canGoBack }) => (
  <header className={`${styles.flexBetween} py-6 px-10 pt-8`}>
    <div className="flex items-center gap-4">
      {canGoBack && <BackButton />}
      <h1 className={`text-2xl ${styles.textSemibold}`}>{title}</h1>
    </div>
    <div className="flex items-center gap-3">
      <Avatar
        size="sm"
        avatar={currentUser.avatar}
        className="bg-[#E3E3E3] text-white"
      />
      <div className="text-left">
        <div className={styles.textSemibold}>{currentUser.name}</div>
        <div className={styles.textSmall}>{currentUser.company}</div>
      </div>
    </div>
  </header>
)

export default Header

const BackButton: React.FC = () => {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <button
      onClick={handleGoBack}
      className="
        w-10 h-10 
        bg-white 
        rounded-full 
        shadow-md 
        flex items-center justify-center
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:scale-105 hover:bg-gray-50
        active:scale-95 active:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      "
      aria-label="이전 페이지로 이동"
    >
      <ChevronLeft
        size={24}
        className="text-gray-700 transition-colors duration-200 hover:text-gray-900"
      />
    </button>
  )
}
