export interface Tab {
  id: string
  label: string
  content: string
}

export interface FeedbackReportProps {
  selectedYear?: string
  selectedRating?: string
  memberName?: string
  type: 'feedback' | 'final' | 'evaluation' | 'memberEvaluation'
}
