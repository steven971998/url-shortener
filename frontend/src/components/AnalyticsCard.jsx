import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export default function AnalyticsCard({ data }) {

  const chartData = [
    {
      name: "Clicks",
      clicks: data.clicks
    }
  ]

  return (

    <BarChart width={400} height={300} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="clicks" />
    </BarChart>

  )

}