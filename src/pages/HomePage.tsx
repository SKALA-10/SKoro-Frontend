import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { navItems } from '../constants/navigation'
import { Navbar } from '../components/navbar'
import { MainContent, PageHeader } from '../components/layout'
import { styles } from '../components/navbar'
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
    <div className={`flex h-screen ${styles.grayBg}`}>
      <Navbar />

      {/* Main Application */}
      <main className="flex-1 flex flex-col md:ml-0 mt-16 md:mt-0">
        <PageHeader activeItem={activeItem} currentPath={location} />
        <MainContent activeItem={activeItem} currentPath={location} />
      </main>
    </div>
  )
}

export default HomePage
