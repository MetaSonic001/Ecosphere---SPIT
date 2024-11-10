'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Line } from 'react-chartjs-2'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../components/ui/chart"

export function EmissionsTrends({ userData }) {
  const [emissionsData, setEmissionsData] = useState(null)

  useEffect(() => {
    fetchEmissionsData()
  }, [userData])

  const fetchEmissionsData = async () => {
    try {
      // API call to get emissions data
      const response = await fetch('/api/trpc/get-emissions-data')
      const data = await response.json()
      setEmissionsData(data)
    } catch (error) {
      console.error('Error fetching emissions data:', error)
    }
  }

  if (!emissionsData) {
    return <div>Loading emissions data...</div>
  }

  const chartData = {
    labels: emissionsData.labels,
    datasets: [
      {
        label: 'Carbon Emissions',
        data: emissionsData.values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Carbon Emissions Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            emissions: {
              label: "Carbon Emissions",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <Line data={chartData} options={{ responsive: true }} />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}