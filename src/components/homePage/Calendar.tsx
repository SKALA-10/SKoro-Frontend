import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { calendarEvents } from '../../dummy/dashboart'

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState({ year: 2025, month: 5 })

  const changeMonth = (direction: any) => {
    setCurrentMonth((prev) => {
      let newMonth = prev.month + direction
      let newYear = prev.year

      if (newMonth > 12) {
        newMonth = 1
        newYear += 1
      } else if (newMonth < 1) {
        newMonth = 12
        newYear -= 1
      }

      return { year: newYear, month: newMonth }
    })
  }

  const generateCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.year,
      currentMonth.month,
      0
    ).getDate()
    const firstDay = new Date(
      currentMonth.year,
      currentMonth.month - 1,
      1
    ).getDay()
    const prevMonthDays = new Date(
      currentMonth.year,
      currentMonth.month - 1,
      0
    ).getDate()
    const days = []

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isPrevMonth: true,
        date: new Date(
          currentMonth.year,
          currentMonth.month - 2,
          prevMonthDays - i
        ),
      })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(currentMonth.year, currentMonth.month - 1, day),
      })
    }

    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7
    const remainingCells = totalCells - (daysInMonth + firstDay)
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isNextMonth: true,
        date: new Date(currentMonth.year, currentMonth.month, day),
      })
    }

    return days
  }

  const getEventsForDate = (date: any) => {
    return calendarEvents.filter((event) => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)
      const checkDate = new Date(date)

      eventStart.setHours(0, 0, 0, 0)
      eventEnd.setHours(23, 59, 59, 999)
      checkDate.setHours(12, 0, 0, 0)

      return checkDate >= eventStart && checkDate <= eventEnd
    })
  }

  const getEventPosition = (event: any, date: any) => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)
    const checkDate = new Date(date)

    eventStart.setHours(0, 0, 0, 0)
    eventEnd.setHours(0, 0, 0, 0)
    checkDate.setHours(0, 0, 0, 0)

    const isStart = eventStart.getTime() === checkDate.getTime()
    const isEnd = eventEnd.getTime() === checkDate.getTime()
    const isMiddle = checkDate > eventStart && checkDate < eventEnd

    return { isStart, isEnd, isMiddle }
  }

  return (
    <div className="h-1/2 pb-2 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-2">성과평가 달력</h2>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeMonth(-1)}>
            <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 mb-2" />
          </button>
          <span className="font-medium text-gray-700 min-w-[100px] text-center mb-1.5">
            {currentMonth.year}년 {currentMonth.month}월
          </span>
          <button onClick={() => changeMonth(1)}>
            <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 mb-2" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 max-h-96 overflow-y-auto space-y-4 p-2">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {generateCalendar().map((dayObj, index) => {
            const events = getEventsForDate(dayObj.date)
            const isToday =
              dayObj.isCurrentMonth &&
              dayObj.day === new Date().getDate() &&
              currentMonth.month === new Date().getMonth() + 1 &&
              currentMonth.year === new Date().getFullYear()

            return (
              <div
                key={index}
                className="relative h-12 flex flex-col justify-start items-center p-1"
              >
                {/* Day number */}
                <div
                  className={`text-sm font-medium ${
                    dayObj.isCurrentMonth
                      ? isToday
                        ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                        : 'text-gray-900'
                      : 'text-gray-300'
                  }`}
                >
                  {dayObj.day}
                </div>

                {/* Events */}
                <div className="w-full mt-1 space-y-0.5">
                  {events.map((event) => {
                    const position = getEventPosition(event, dayObj.date)
                    return (
                      <div key={event.id} className="relative">
                        <div
                          className={`h-1 text-xs font-medium ${
                            position.isStart && position.isEnd
                              ? 'rounded-full'
                              : position.isStart
                              ? 'rounded-l-full'
                              : position.isEnd
                              ? 'rounded-r-full'
                              : ''
                          }`}
                          style={{ backgroundColor: event.color }}
                        />
                        {position.isStart && (
                          <div
                            className="absolute top-0 left-0 text-xs font-medium text-white px-1 whitespace-nowrap overflow-hidden"
                            style={{
                              backgroundColor: event.color,
                              borderRadius: '0.25rem',
                              fontSize: '0.6rem',
                              lineHeight: '1rem',
                              maxWidth: '100px',
                            }}
                          >
                            {event.title}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Calendar
