export interface NavItem {
  id: string
  icon: React.ComponentType<any>
  label: string
  path: string
}

export interface NavigationProps {
  activeItem: string
  onNavClick: (item: NavItem) => void
  onLogout: () => void
}

export interface MobileHeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export interface MobileMenuProps extends NavigationProps {
  userRole: 'manager' | 'member' | 'admin' | string
  isOpen: boolean
  onClose: () => void
}

export interface DesktopSidebarProps extends NavigationProps {
  userRole: 'manager' | 'member' | 'admin' | string
  isCollapsed: boolean
  hoveredItem: string | null
  onToggleCollapse: () => void
  onHoverItem: (item: string | null) => void
}
