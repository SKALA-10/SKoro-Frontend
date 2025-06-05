import { useState, useRef, useEffect } from 'react'
import { Download } from 'lucide-react'
import type { FeedbackReportProps, Tab } from '../../types/Report.types'
import { styles } from '.'

const Report: React.FC<FeedbackReportProps> = ({
  selectedYear,
  selectedRating,
  type,
}) => {
  const [activeTab, setActiveTab] = useState<string>('report')
  const [indicatorStyle, setIndicatorStyle] = useState<{
    width: number
    left: number
  }>({
    width: 0,
    left: 0,
  })

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const tabs: Tab[] = [
    {
      id: 'report',
      label: `${selectedYear} ${selectedRating} 레포트`,
      content: '여기에 최종 평가 레포트 내용이 표시됩니다.',
    },
    {
      id: 'summary',
      label: '팀원 의견 요약',
      content: '여기에 팀원 의견 요약 내용이 표시됩니다.',
    },
  ]

  const updateIndicator = (tabId: string) => {
    const tabElement = tabRefs.current[tabId]
    const containerElement = containerRef.current

    if (tabElement && containerElement) {
      const tabRect = tabElement.getBoundingClientRect()
      const containerRect = containerElement.getBoundingClientRect()

      setIndicatorStyle({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      })
    }
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    updateIndicator(tabId)
  }

  const handleTabHover = (tabId: string) => {
    updateIndicator(tabId)
  }

  const handleMouseLeave = () => {
    updateIndicator(activeTab)
  }

  useEffect(() => {
    if (type !== 'final') return

    const handleResize = () => {
      updateIndicator(activeTab)
    }

    setTimeout(() => {
      updateIndicator(activeTab)
    }, 0)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeTab, type])

  return (
    <section className={styles.reportSection}>
      {type === 'final' ? (
        // 최종 평가 레포트
        <>
          <div className="w-full flex justify-between mt-[-8px] items-center">
            <div
              ref={containerRef}
              className="relative flex justify-start  mt-2"
              onMouseLeave={handleMouseLeave}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el
                  }}
                  className={`
                  px-6 py-5 pt-0 text-base font-semibold cursor-pointer transition-colors duration-300 
                  whitespace-nowrap border-none bg-transparent outline-none
                  ${
                    activeTab === tab.id
                      ? 'text-gray-600'
                      : 'text-gray-400 hover:text-gray-500'
                  }
                   mb-[-4px]
                `}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={() => handleTabHover(tab.id)}
                >
                  {tab.label}
                </button>
              ))}

              {/* 인디케이터 */}
              <div
                className="absolute bottom-0 h-1 bg-blue-400 rounded-t-sm transition-all duration-300 ease-out"
                style={{
                  width: `${indicatorStyle.width}px`,
                  left: `${indicatorStyle.left}px`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>

            <button className={`${styles.reportButton} mb-2`}>
              <Download className="inline-block w-5" />
            </button>
          </div>

          <article
            className={`shadow-lg rounded-b-xl ${styles.reportContentArea} px-6 py-10 min-h-48 flex items-center justify-center text-lg `}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h3>
              <p>{tabs.find((tab) => tab.id === activeTab)?.content}</p>
            </div>
          </article>
        </>
      ) : (
        // 피드백 레포트
        <>
          <div className="mt-[-8px] flex w-full justify-between items-center">
            <h2 className="font-semibold">
              {selectedYear} {selectedRating} 레포트
            </h2>

            <button className={styles.reportButton}>
              <Download className="inline-block w-5" />
            </button>
          </div>

          <article
            className={`mt-2 rounded-xl ${styles.reportContentArea} p-5`}
          ></article>
        </>
      )}
    </section>
  )
}

export default Report
