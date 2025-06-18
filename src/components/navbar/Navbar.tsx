import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { NavItem } from '../../types/Navbar.types'
import {
  managerNavItems,
  memberNavItems,
  adminNavItems,
} from '../../constants/navigation'
import { MobileHeader, MobileMenu, DesktopSidebar } from '.'
import UserService from '../../services/UserService'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { clearAuthCache } from '../../store/useAuthStore'

const Navbar: React.FC = () => {
  const userRole = useUserInfoStore((state) => state.role)
  const navigate = useNavigate()
  const location = useLocation().pathname

  const [activeItem, setActiveItem] = useState<string>('home')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // URL 변경 시 activeItem 업데이트
  useEffect(() => {
    const currentNavItem = (
      userRole === 'MANAGER'
        ? managerNavItems
        : userRole === 'MEMBER'
        ? memberNavItems
        : adminNavItems
    ).find((item) => item.path === location)
    if (currentNavItem) {
      setActiveItem(currentNavItem.id)
    } else if (location === '/') {
      setActiveItem('home')
    }
  }, [location, userRole])

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.id)
    navigate(item.path)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    UserService.logout()
      .then(() => {
        console.log('로그아웃 성공')
        clearAuthCache()
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
        userRole={userRole}
        isOpen={isMobileMenuOpen}
        activeItem={activeItem}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Desktop Navigation */}
      <DesktopSidebar
        userRole={userRole}
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
