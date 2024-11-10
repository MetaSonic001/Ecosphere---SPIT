'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import Papa from 'papaparse'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface DeviceData {
  device_id: string
  device_type: string
  energy_consumption: number
  usage_time: number
  room: string
  efficiency_rating: number
  is_on: boolean
}

interface CarbonEmissionPredictorProps {
  deviceData: DeviceData[]
}

export default function CarbonEmissionPredictor({ deviceData }: CarbonEmissionPredictorProps) {
  const [futureHours, setFutureHours] = useState<number>(24)
  const [predictedEmissions, setPredictedEmissions] = useState<number[]>([])
  const [historicalData, setHistoricalData] = useState<DeviceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const CO2_PER_KWH = 0.4 // kg CO2 per kWh

  const predictEmissions = useCallback(() => {
    const hourlyPredictions: number[] = []
    const combinedData = [...historicalData, ...deviceData]
    
    for (let hour = 1; hour <= futureHours; hour++) {
      let totalEmission = 0
      
      combinedData.forEach(device => {
        if (!device.is_on) return

        // Calculate base emission for this device
        const hourlyConsumption = device.energy_consumption / 24
        
        // Apply efficiency factor (higher rating means lower emissions)
        const efficiencyFactor = 1 - (device.efficiency_rating / 10)
        
        // Apply time-of-day factor (simplified)
        const timeOfDay = (hour % 24) / 24
        const usageFactor = 0.5 + Math.sin(timeOfDay * Math.PI) * 0.5
        
        // Apply usage time factor
        const usageTimeFactor = Math.min(device.usage_time / 24, 1)
        
        const emission = hourlyConsumption * efficiencyFactor * usageFactor * usageTimeFactor * CO2_PER_KWH
        totalEmission += emission
      })

      hourlyPredictions.push(parseFloat(totalEmission.toFixed(4)))
    }

    setPredictedEmissions(hourlyPredictions)
  }, [historicalData, deviceData, futureHours, CO2_PER_KWH])

  useEffect(() => {
    loadCSVData()
  }, [])

  useEffect(() => {
    if (historicalData.length > 0 && deviceData.length > 0) {
      predictEmissions()
    }
  }, [historicalData, deviceData, futureHours, predictEmissions])

  const loadCSVData = async () => {
    try {
      const response = await fetch('../../../../public/smart_home_data.csv')
      const csvText = await response.text()
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const parsedData = results.data.map((row: any) => ({
            ...row,
            energy_consumption: parseFloat(row.energy_consumption),
            usage_time: parseFloat(row.usage_time),
            efficiency_rating: parseFloat(row.efficiency_rating),
            is_on: true
          }))
          setHistoricalData(parsedData as DeviceData[])
          setIsLoading(false)
        },
        error: (error) => {
          console.error('Error parsing CSV:', error)
          setIsLoading(false)
        }
      })
    } catch (error) {
      console.error('Error loading CSV:', error)
      setIsLoading(false)
    }
  }

  const chartData = {
    labels: Array.from({ length: futureHours }, (_, i) => `Hour ${i + 1}`),
    datasets: [
      {
        label: 'Predicted Carbon Emissions (kg CO2)',
        data: predictedEmissions,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Predicted Carbon Emissions Over Time'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            const prevValue = context.parsed.x > 0 ? predictedEmissions[context.parsed.x - 1] : value;
            const trend = value > prevValue ? '↑' : value < prevValue ? '↓' : '→';
            return `${value.toFixed(4)} kg CO2 ${trend}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Carbon Emissions (kg CO2)'
        }
      }
    }
  }

  const totalPredictedEmissions = parseFloat(predictedEmissions.reduce((sum, val) => sum + val, 0).toFixed(2))
  const averageHourlyEmission = parseFloat((totalPredictedEmissions / futureHours).toFixed(2))
  const projectedAnnualEmissions = parseFloat((averageHourlyEmission * 24 * 365).toFixed(2))

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Loading data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Carbon Emission Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="future-hours">Prediction Duration (hours)</Label>
            <Input
              id="future-hours"
              type="number"
              min={1}
              max={168}
              value={futureHours}
              onChange={(e) => setFutureHours(Math.max(1, Math.min(168, Number(e.target.value))))}
              className="mt-1"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Device Summary</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="text-sm text-gray-600">Total Devices</p>
                <p className="text-lg font-medium">{deviceData.length + historicalData.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Devices</p>
                <p className="text-lg font-medium">{deviceData.filter(device => device.is_on).length + historicalData.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Efficiency</p>
                <p className="text-lg font-medium">
                  {((deviceData.reduce((sum, device) => sum + device.efficiency_rating, 0) + 
                    historicalData.reduce((sum, device) => sum + device.efficiency_rating, 0)) / 
                    (deviceData.length + historicalData.length)).toFixed(1)}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Emission Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Predicted Emissions</p>
                <p className="text-lg font-medium">{totalPredictedEmissions} kg CO2</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Hourly Emissions</p>
                <p className="text-lg font-medium">{averageHourlyEmission} kg CO2/hr</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Projected Annual Emissions</p>
                <p className="text-lg font-medium">{projectedAnnualEmissions} kg CO2/year</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Emission Trend Prediction</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}