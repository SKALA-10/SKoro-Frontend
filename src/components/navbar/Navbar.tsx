import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { NavItem } from '../../types/Navbar.types'
import { navItems } from '../../constants/navigation'
import { MobileHeader, MobileMenu, DesktopSidebar } from '.'

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
    navigate('/login', { replace: true })
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
