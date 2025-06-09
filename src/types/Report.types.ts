export interface Tab {
  id: string
  label: string
  content: string
}

export interface FeedbackReportProps {
  selectedYear?: string
  selectedRating?: string
  type: 'feedback' | 'final'
}
