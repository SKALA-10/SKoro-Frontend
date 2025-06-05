export interface TeamMember {
  id: number
  name: string
  role: string
  avatar: string
  rank: number
  contributionRate: number
  status: string
  maxScore: number
  currentScore: number
}

export interface User {
  name: string
  company: string
  avatar: string
}

export interface HeaderProps {
  title: string
}

export interface DropdownProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

export interface SearchBoxProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export interface MemberCardProps {
  member: TeamMember
}
