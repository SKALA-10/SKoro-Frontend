import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { chartData } from '../../dummy/dashboart'

const Performance = () => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm">
          <p className="font-medium">{`${label}년`}</p>
          <p className="text-blue-400">{`평균: ${payload[0].value}%`}</p>
          <p className="text-green-400">{`목표: ${payload[1].value}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-1/2 flex flex-col pt-2">
      <h2 className="font-semibold mb-2">최종 평가</h2>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 max-h-96 overflow-y-auto p-2">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="ml-[-1rem] mt-[0.5rem]"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value1"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue1)"
            />
            <Area
              type="monotone"
              dataKey="value2"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Performance
