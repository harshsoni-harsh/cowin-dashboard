import {PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = ['#2d87bb', '#a3df9f', '#64c2a6']

export default function VaccinationByGender(props) {
  const {data} = props
  console.log(data)
  if (data)
    return (
      <div className="graph">
        <h1 className="graph-heading">Vaccination by Age</h1>
        <PieChart width={800} height={400}>
          <Pie data={data} cx={400} cy={200} fill="#8884d8" dataKey="count">
            {data.map((entry, index) => (
              <Cell key="age" fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
            formatter={(value, entry, index) => data[index].age}
          />
        </PieChart>
      </div>
    )
  return null
}
