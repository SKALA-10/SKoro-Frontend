import { Home, Target, Dumbbell, FileText, PenTool } from 'lucide-react'
import type { NavItem } from '../types/navigation'

export const navItems: NavItem[] = [
  { id: 'home', icon: Home, label: '홈', path: '/' },
  {
    id: 'team',
    icon: Target,
    label: '팀 관리 화면',
    path: '/team',
  },
  {
    id: 'feedback',
    icon: Dumbbell,
    label: '분기별 피드백',
    path: '/feedback',
  },
  {
    id: 'final',
    icon: FileText,
    label: '연말 최종평가',
    path: '/final',
  },
  {
    id: 'evaluation',
    icon: PenTool,
    label: '최종평가 시스템',
    path: '/evaluation',
  },
]
