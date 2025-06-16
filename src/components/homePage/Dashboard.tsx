import { Calendar, Evaluations, Performance, Tasks, TeamList } from '.'

const Dashboard = () => {
  return (
    <div className="flex-1 min-w-0 h-full flex flex-col">
      <TeamList />

      <div className="flex-1 min-h-0 flex gap-5">
        <div className="flex-1">
          <Tasks />
          <Evaluations />
        </div>

        <div className="flex flex-col lg:w-96">
          <Calendar />
          <Performance />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
