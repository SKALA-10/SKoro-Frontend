export const tasks = [
  {
    id: 1,
    title: '코딩 자동화: 원가 100억 절감',
    category: '성공적 Biz 구축',
    progress: 30,
    people: 6,
    teamMembers: ['신탁수', '김재현', '이지선', '이해수', '조은정', '박민수'],
    avatars: ['/api/placeholder/30/30', '/api/placeholder/30/30'],
  },
  {
    id: 2,
    title: '인당 매출 6억',
    category: '성공적 Biz 구축',
    progress: 10,
    people: 7,
    teamMembers: [
      '신탁수',
      '김재현',
      '이지선',
      '이해수',
      '조은정',
      '박민수',
      '이수진',
    ],
    avatars: [
      '/api/placeholder/30/30',
      '/api/placeholder/30/30',
      '/api/placeholder/30/30',
      '/api/placeholder/30/30',
      '/api/placeholder/30/30',
      '/api/placeholder/30/30',
      '/api/placeholder/30/30',
    ],
  },
  {
    id: 3,
    title: '전년비 +7점 향상',
    category: '성공적 Biz 구축',
    progress: 20,
    people: 10,
    teamMembers: [
      '신탁수',
      '김재현',
      '이지선',
      '이해수',
      '조은정',
      '박민수',
      '이수진',
      '김태현',
      '박지영',
      '최민호',
    ],
    avatars: ['/api/placeholder/30/30', '/api/placeholder/30/30'],
  },
  {
    id: 4,
    title: 'AI 모델 최적화',
    category: '성공적 Biz 구축',
    progress: 65,
    people: 5,
    teamMembers: ['신탁수', '김재현', '이지선', '이해수', '조은정'],
    avatars: ['/api/placeholder/30/30', '/api/placeholder/30/30'],
  },
  {
    id: 5,
    title: '데이터 파이프라인 구축',
    category: '성공적 Biz 구축',
    progress: 45,
    people: 8,
    teamMembers: [
      '신탁수',
      '김재현',
      '이지선',
      '이해수',
      '조은정',
      '박민수',
      '이수진',
      '김태현',
    ],
    avatars: ['/api/placeholder/30/30', '/api/placeholder/30/30'],
  },
]

export const evaluations = [
  {
    date: '2025.06.02 (월)',
    title: '2025년도 2분기 평가',
    description:
      'AI 기반 코딩 자동화 도입으로 개발 효율을 극대화하고 연간 100억 원의 비용을 절감',
    progress: 70,
    yearOverYear: 11,
    previousYear: 1,
  },
  {
    date: '2025.03.10 (금)',
    title: '2025년도 1분기 평가',
    description:
      'AI 도구 도입으로 단기 효율은 올렸지만, 품질 관리 한계가 드러남',
    progress: 70,
    yearOverYear: -3,
    previousYear: -10,
  },
  {
    date: '2024.12.15 (일)',
    title: '2024년도 4분기 평가',
    description: '연말 목표 달성을 위한 집중적인 개발 진행',
    progress: 85,
    yearOverYear: 8,
    previousYear: 5,
  },
  {
    date: '2024.09.20 (금)',
    title: '2024년도 3분기 평가',
    description: '중간 점검 및 전략 수정을 통한 성과 개선',
    progress: 60,
    yearOverYear: -2,
    previousYear: -5,
  },
]

export const chartData = [
  { year: '2022', value1: 45, value2: 40 },
  { year: '2022.5', value1: 52, value2: 48 },
  { year: '2023', value1: 48, value2: 55 },
  { year: '2023.5', value1: 65, value2: 62 },
  { year: '2024', value1: 70, value2: 68 },
  { year: '2024.5', value1: 85, value2: 75 },
]

export const calendarEvents = [
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
