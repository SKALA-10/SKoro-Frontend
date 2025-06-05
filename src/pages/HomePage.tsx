import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { navItems } from '../constants/navigation'
import { MainContent, PageHeader } from '../components/layout'
import useDocumentTitle from '../hooks/useDocumentTitle'

const HomePage: React.FC = () => {
  const location = useLocation().pathname
  const [activeItem, setActiveItem] = useState<string>('home')

  useDocumentTitle(`${activeItem} - SKoro`)

  useEffect(() => {
    const currentNavItem = navItems.find((item) => item.path === location)
    if (currentNavItem) {
      setActiveItem(currentNavItem.id)
    } else if (location === '/') {
      setActiveItem('home')
    }
  }, [location])

  return (
    <>
      <PageHeader activeItem={activeItem} currentPath={location} />
      <MainContent activeItem={activeItem} currentPath={location} />
    </>
  )
}

export default HomePage
