import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

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

export default function OfficeCarbonTracker({ deviceData }: Props) {
  const officeDevices = deviceData.filter(device => device.room === 'Office')
  const totalConsumption = officeDevices.reduce((sum, device) => sum + device.energy_consumption, 0)
  const carbonEmissions = totalConsumption * 0.4 // Assuming 0.4 kg CO2 per kWh

  const chartData = {
    labels: officeDevices.map(device => device.device_type),
    datasets: [
      {
        data: officeDevices.map(device => device.energy_consumption),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Office Carbon Tracker</h2>
      <Doughnut data={chartData} />
      <p className="mt-4 text-center text-lg font-semibold">
        Total Carbon Emissions: {carbonEmissions.toFixed(2)} kg CO2
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Tip: Use energy-efficient equipment and turn off devices when not in use to reduce your carbon footprint.
      </p>
    </div>
  )
}