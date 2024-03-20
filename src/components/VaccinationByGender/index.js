import {PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = ['#f54394', '#5a8dee', '#2cc6c6']

export default function VaccinationByGender(props) {
  const {data} = props
  if (data)
    return (
      <div className="graph">
        <h1 className="graph-heading">Vaccination by gender</h1>
        <PieChart width={800} height={400}>
          <Pie
            data={data}
            cx={400}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell key="gender" fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
            formatter={(value, entry, index) => data[index].gender}
          />
        </PieChart>
      </div>
    )
  return null
}
