import { useState } from 'react'
import { FilterSection, Report } from '../common'

const FeedbackContent: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025년도')
  const [selectedRating, setSelectedRating] = useState('최종 평가')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="flex-1 flex flex-col pb-5 px-10 overflow-hidden">
      <FilterSection
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType="feedback"
      />
      <Report
        selectedYear={selectedYear}
        selectedRating={selectedRating}
        type="feedback"
      />
    </main>
  )
}

export default FeedbackContent
