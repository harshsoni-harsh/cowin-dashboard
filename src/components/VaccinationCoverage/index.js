import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const App = props => {
  const {data} = props
  const DataFormatter = number => number
  if (data)
    return (
      <div className="graph">
        <h1 className="graph-heading">Vaccination Coverage</h1>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{
              top: 5,
            }}
          >
            <XAxis
              dataKey="vaccine_date"
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />
            <Legend
              wrapperStyle={{
                padding: 30,
              }}
            />
            <Bar
              dataKey="dose_1"
              name="Dose 1"
              radius={[10, 10, 0, 0]}
              fill="#5a8dee"
              barSize="20%"
            />
            <Bar
              dataKey="dose_2"
              name="Dose 2"
              radius={[10, 10, 0, 0]}
              fill="#f54394"
              barSize="20%"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  return null
}

export default App
