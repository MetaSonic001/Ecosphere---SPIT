import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DeviceData {
  device_id: string
  device_type: string
  energy_consumption: number
  usage_time: number
  room: string
  efficiency_rating: number
}

interface Props {
  deviceData: DeviceData[]
}

export default function EnergyConsumptionInsights({ deviceData }: Props) {
  const roomData = deviceData.reduce((acc, device) => {
    if (!acc[device.room]) {
      acc[device.room] = 0
    }
    acc[device.room] += device.energy_consumption
    return acc
  }, {} as { [key: string]: number })

  const chartData = {
    labels: Object.keys(roomData),
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: Object.values(roomData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Energy Consumption by Room',
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Energy Consumption Insights</h2>
      <Bar data={chartData} options={options} />
      <p className="mt-4 text-sm text-gray-600">
        Tip: Focus on reducing energy usage in high-consumption rooms.
      </p>
    </div>
  )
}