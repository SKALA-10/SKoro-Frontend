import { useLocation } from 'react-router-dom'
import { Avatar } from '../common'

const MemberInfo: React.FC = () => {
  const location = useLocation()
  const member = location.state?.member || memberDummy

  return (
    <section className="mt-5 lg:mt-0 w-full lg:w-72 flex flex-col pb-5 px-10 lg:ml-[-12px] lg:pl-0">
      <h2 className="font-semibold">세부 정보</h2>

      <section className="flex-1 mt-2 bg-white rounded-xl p-6 pt-8 shadow-md flex flex-col items-center">
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
        <div className="w-full">
          <h3 className="text-sm font-semibold mb-1">이메일</h3>
          <p className="text-sm ">{member.email}</p>
        </div>
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
