import type { HeaderProps } from '../../types/TeamPage.types'
import { styles, Avatar } from '.'
import { currentUser } from '../../dummy/currentUser'

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className={`${styles.flexBetween} py-6 px-10 pt-8`}>
    <h1 className={`text-2xl ${styles.textSemibold}`}>{title}</h1>
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
