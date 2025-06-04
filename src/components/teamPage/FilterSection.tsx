import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import type { DropdownProps, SearchBoxProps } from '../../types/TeamPage.types'
import { styles, Button } from '.'

const FilterSection: React.FC<{
  selectedYear: string
  setSelectedYear: (year: string) => void
  selectedRating: string
  setSelectedRating: (rating: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}> = ({
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
  searchQuery,
  setSearchQuery,
}) => (
  <section className="mb-5 flex-shrink-0">
    <nav
      className="flex gap-6 mb-5 flex-wrap"
      role="navigation"
      aria-label="필터 옵션"
    >
      <Dropdown
        label="연도"
        value={selectedYear}
        options={['2025년도', '2024년도', '2023년도', '2022년도', '2021년도']}
        onChange={setSelectedYear}
      />
      <Dropdown
        label="평가"
        value={selectedRating}
        options={['최종 평가', '중간 평가', '초기 평가']}
        onChange={setSelectedRating}
      />
      <SearchBox
        placeholder="이름을 입력하세요"
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </nav>
    <hr className="border-gray-200" />
  </section>
)

export default FilterSection

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative min-w-[200px]">
      <label className={`block ${styles.textSemibold} mb-2`}>{label}</label>
      <div className="relative">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left"
        >
          <span className="block truncate pr-8">{value}</span>
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>

        {isOpen && (
          <>
            <nav className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </nav>
            <div
              className="fixed inset-0 z-0"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  )
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  value,
  onChange,
}) => (
  <div className="relative flex-1 min-w-[300px]">
    <label className={`block ${styles.textSemibold} mb-2`}>팀원 검색</label>
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${styles.input} w-full pr-12`}
        aria-label="팀원 검색"
      />
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        aria-hidden="true"
      />
    </div>
  </div>
)
