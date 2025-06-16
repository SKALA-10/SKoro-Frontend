import { useLocation } from 'react-router-dom'
import { Avatar } from '../common'
import { currentUser } from '../../dummy/currentUser'

const MemberInfo: React.FC<{
  pageType?: 'home'
}> = ({ pageType }) => {
  const location = useLocation()
  const member = location.state?.member || currentUser || memberDummy
  const currentMonth = {
    month: new Date().getMonth() + 1, // 현재 월 (1부터 시작)
    year: new Date().getFullYear(), // 현재 연도
  }

  return (
    <section
      className={`mt-5 lg:mt-0 w-full lg:w-72 flex flex-col px-0 lg:pl-0 ${
        pageType === 'home' ? 'lg:px-10' : 'pb-5 lg:ml-[-12px] px-10'
      }`}
    >
      <h2 className="font-semibold">세부 정보</h2>

      <section
        className={`flex-1 mt-2 bg-white rounded-xl p-6 pt-8 flex flex-col items-center ${
          pageType === 'home'
            ? 'shadow-sm hover:shadow-lg mb-10 lg:mb-0'
            : 'shadow-md'
        }`}
      >
        {/* 프로필 이미지 */}
        <Avatar size="xl" avatar={member.avatar} />

        {/* 이름 */}
        <h2 className="text-2xl font-semibold mb-1 mt-5">{member.name}</h2>

        {/* 부서 정보 */}
        <p className="mb-7 text-sm">SKoro 부서</p>

        {/* 직위 섹션 */}
        <div className="w-full mb-6">
          <h3 className="text-sm font-semibold mb-1">직위</h3>
          <p className="text-sm ">팀원</p>
        </div>

        {/* 이메일 섹션 */}
        <div className="w-full mb-6">
          <h3 className="text-sm font-semibold mb-1">이메일</h3>
          <p className="text-sm ">{member.email}</p>
        </div>

        {pageType === 'home' && (
          <div className="w-full mb-6">
            <h3 className="text-sm font-semibold mb-2">이번 달 일정</h3>
            <div className="">
              {calendarEvents.map((event) => {
                const eventMonth = event.start.getMonth() + 1
                const eventYear = event.start.getFullYear()

                if (
                  eventMonth === currentMonth.month &&
                  eventYear === currentMonth.year
                ) {
                  return (
                    <div
                      key={event.id}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <span className="text-gray-600">
                        {event.start.getDate()}일-{event.end.getDate()}일:{' '}
                        {event.title}
                      </span>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        )}
      </section>
    </section>
  )
}

export default MemberInfo

// api 연동 시, 멤버 데이터가 없을 경우에 url의 사번을 통해 정보 가져오도록 수정
const memberDummy = {
  id: 'member1',
  name: '홍길동',
  email: '',
}

// 달력 일정 데이터
const calendarEvents = [
  {
    id: 1,
    title: '프로젝트 검토',
    start: new Date(2025, 4, 17), // 5월 17일
    end: new Date(2025, 4, 18), // 5월 18일
    color: '#3B82F6',
    bgColor: '#DBEAFE',
  },
  {
    id: 2,
    title: '분기 평가',
    start: new Date(2025, 4, 24), // 5월 24일
    end: new Date(2025, 4, 25), // 5월 25일
    color: '#EF4444',
    bgColor: '#FEE2E2',
  },
  {
    id: 3,
    title: '팀 회의',
    start: new Date(2025, 5, 2), // 6월 2일
    end: new Date(2025, 5, 4), // 6월 4일
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
]
