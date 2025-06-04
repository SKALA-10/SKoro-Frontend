import { styles } from '.'

const Avatar: React.FC<{
  size: 'sm' | 'md' | 'lg'
  avatar: string
  className?: string
}> = ({ size, avatar, className = '' }) => {
  const sizeClasses = {
    sm: 'w-11 h-11 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  }

  return (
    <div
      className={`${styles.avatar} bg-blue-100 ${sizeClasses[size]} ${className}`}
    >
      {avatar}
    </div>
  )
}

export default Avatar
