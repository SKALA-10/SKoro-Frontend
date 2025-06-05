import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { NavItem } from '../../types/Navbar.types'
import { navItems } from '../../constants/navigation'
import { MobileHeader, MobileMenu, DesktopSidebar } from '.'
import UserService from '../../services/UserService'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname

  const [activeItem, setActiveItem] = useState<string>('home')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // URL 변경 시 activeItem 업데이트
  useEffect(() => {
    const currentNavItem = navItems.find((item) => item.path === location)
    if (currentNavItem) {
      setActiveItem(currentNavItem.id)
    } else if (location === '/') {
      setActiveItem('home')
    }
  }, [location])

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.id)
    navigate(item.path)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    UserService.logout()
      .then(() => {
        console.log('로그아웃 성공')
        localStorage.removeItem('SKoroAccessToken')
        localStorage.removeItem('SKoroRefreshToken')
        navigate('/login', { replace: true })
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error)
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.')
      })
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile Navigation */}
      <MobileHeader
        isMenuOpen={isMobileMenuOpen}
        onToggleMenu={toggleMobileMenu}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        activeItem={activeItem}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Desktop Navigation */}
      <DesktopSidebar
        isCollapsed={isCollapsed}
        activeItem={activeItem}
        hoveredItem={hoveredItem}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        onToggleCollapse={toggleSidebar}
        onHoverItem={setHoveredItem}
      />
    </>
  )
}

export default Navbar
