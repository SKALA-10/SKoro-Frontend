import type { HeaderProps } from '../../types/TeamPage.types'
import { styles, Avatar } from '.'

const Header: React.FC<HeaderProps> = ({ title, user }) => (
  <header className={`${styles.flexBetween} py-6 px-10 pt-8`}>
    <h1 className={`text-2xl ${styles.textSemibold}`}>{title}</h1>
    <div className="flex items-center gap-3">
      <Avatar
        size="sm"
        avatar={user.avatar}
        className="bg-[#E3E3E3] text-white"
      />
      <div className="text-left">
        <div className={styles.textSemibold}>{user.name}</div>
        <div className={styles.textSmall}>{user.company}</div>
      </div>
    </div>
  </header>
)

export default Header
