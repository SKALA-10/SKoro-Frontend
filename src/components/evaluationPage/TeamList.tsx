import { Avatar } from '../../components/common'
// import { feedbackTeamMembers } from '../../dummy/teamMembers'
import { useNavigate } from 'react-router-dom'
import { use, useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import EvaluationService from '../../services/EvaluationService'
import { useUserInfoStore } from '../../store/useUserInfoStore'

interface TeamMemberWithEvaluation {
  peerEvaluationId?: number
  targetEmpNo?: string
  targetEmpName?: string
  targetEmpProfileImage?: string
  completed?: boolean

  empNo?: string
  empName?: string
  profileImage?: string
  status?: string
}

const TeamList: React.FC<{
  periodId: number
  isSubmitted?: boolean
  setIsSubmitted?: (isSubmitted: boolean) => void
  teamEvaluationId?: number | null
  evaluationReasons?: any[]
}> = ({
  periodId,
  isSubmitted,
  setIsSubmitted,
  teamEvaluationId,
  evaluationReasons,
}) => {
  const { id } = useParams<{ id: string }>()

  const location = useLocation()
  const {
    teamEvaluationId: curTeamEvaluationId,
    evaluationReasons: getEvaluationReasonsFromState,
    getEvaluationReasons,
  } = location.state || {}

  const navigate = useNavigate()
  const userRole = useUserInfoStore((state) => state.role)
  const userEmpNo = useUserInfoStore((state) => state.empNo)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const SCROLL_POSITION_KEY = 'teamlist-scroll-position'
  const [feedbackTeamMembers, setFeedbackTeamMembers] = useState<
    TeamMemberWithEvaluation[]
  >([])

  // 선택된 멤버 ID 상태
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(
    id ? id : null
  )

  useEffect(() => {
    console.log('팀원 리스트 조회 시작:', periodId, userRole, userEmpNo)
    if (userRole === 'MANAGER') {
      // 팀원 리스트 조회 (이름, 사진, 하향 평가 완료 여부)
      EvaluationService.getEmployeesStatusList(
        teamEvaluationId || curTeamEvaluationId
      )
        .then((data) => {
          console.log('팀원 리스트 조회 성공:', data)
          setFeedbackTeamMembers(data)
          if (isSubmitted) {
            const firstIncompleteMember = data.find(
              (member: any) =>
                member.status !== 'COMPLETED' && member.empNo !== id
            )
            if (firstIncompleteMember) {
              handleMemberClick(
                periodId,
                firstIncompleteMember.empNo,
                firstIncompleteMember
              )
            }
            if (isSubmitted && setIsSubmitted) {
              setIsSubmitted(false)
            }
          }
        })
        .catch((error) => {
          console.error('팀원 리스트 조회 실패:', error)
        })
    } else {
      // [팀원] 동료 평가 리스트 조회
      EvaluationService.getPeerEvaluationList(userEmpNo, periodId)
        .then((data) => {
          console.log('동료 평가 리스트 조회 성공:', data)
          setFeedbackTeamMembers(data)
          if ((userRole === 'MEMBER' && !id) || isSubmitted) {
            const firstIncompleteMember = data.find(
              (member: any) => !member.completed
            )
            if (firstIncompleteMember) {
              handleMemberClick(
                firstIncompleteMember.peerEvaluationId,
                firstIncompleteMember.targetEmpNo,
                firstIncompleteMember
              )
            }
            if (isSubmitted && setIsSubmitted) {
              setIsSubmitted(false)
            }
          }
        })
        .catch((error) => {
          console.error('동료 평가 리스트 조회 실패:', error)
        })
    }
  }, [id, isSubmitted, periodId, curTeamEvaluationId])

  // 컴포넌트 마운트 시 저장된 스크롤 위치 복원
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY)
    if (savedPosition && scrollContainerRef.current) {
      // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 스크롤 위치 설정
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = parseInt(savedPosition, 10)
        }
      }, 0)
    }
  }, [])

  const handleMemberClick = (
    periodId: number,
    memberId: string,
    member: TeamMemberWithEvaluation
  ) => {
    // 선택된 멤버가 이미 선택되어 있으면 선택 해제, 아니면 선택
    if (selectedMemberId === memberId && userRole === 'MANAGER') {
      setSelectedMemberId(null)
      navigate('/evaluation') // 평가 페이지로 이동
    } else {
      setSelectedMemberId(memberId)
      navigate(`/evaluation/${teamEvaluationId ? member.empNo : periodId}`, {
        state: {
          member,
          periodId,
          teamEvaluationId,
          evaluationReasons,
          getEvaluationReasons: getEvaluationReasons || evaluationReasons,
        },
      })
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 스크롤 위치 저장
    sessionStorage.setItem(
      SCROLL_POSITION_KEY,
      e.currentTarget.scrollLeft.toString()
    )
  }

  const CheckIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        fill="white"
      />
    </svg>
  )

  return (
    <section className="px-10 mb-5">
      <h2 className="font-semibold mb-2">팀원 리스트</h2>
      <section className="relative bg-white rounded-xl shadow-md">
        {/* 팀원 리스트 */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto px-5 py-4 space-x-7 scrollbar-hide"
        >
          {feedbackTeamMembers.map((member) => {
            const isSelected =
              selectedMemberId === member.targetEmpNo ||
              selectedMemberId === member.empNo
            const isOtherSelected = selectedMemberId !== null && !isSelected

            return (
              <button
                onClick={() =>
                  handleMemberClick(
                    member.peerEvaluationId || periodId,
                    member.targetEmpNo || member.empNo || '',
                    member
                  )
                }
                disabled={member.completed}
                key={member.targetEmpNo || member.empNo}
                className={`flex flex-col items-center min-w-16 max-w-16 truncate transition-opacity duration-200 ${
                  isOtherSelected ? 'opacity-50' : 'opacity-100'
                }
                ${
                  member.completed
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer hover:opacity-90'
                }
                `}
              >
                <span className="text-2xl relative">
                  {member.completed || member.status === 'COMPLETED' ? (
                    // 평가 완료된 경우: 초록색 배경의 체크 표시
                    <div className="w-16 h-16 bg-[#02BC7D] rounded-full flex items-center justify-center">
                      <CheckIcon />
                    </div>
                  ) : (
                    // 평가 미완료된 경우: 기존 Avatar
                    <Avatar avatar={'👤'} size="md" />
                  )}
                </span>
                <span className="mt-2 text-sm font-semibold">
                  {member.targetEmpName || member.empName}
                </span>
              </button>
            )
          })}
        </div>

        {/* 왼쪽 페이드 오버레이 */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none rounded-l-xl"
          style={{
            background: 'linear-gradient(to right, white, transparent)',
          }}
        />

        {/* 오른쪽 페이드 오버레이 */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none rounded-r-xl"
          style={{
            background: 'linear-gradient(to left, white, transparent)',
          }}
        />
      </section>
    </section>
  )
}

export default TeamList
