'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Switch } from "../../../components/ui/switch"
import { Lightbulb, Tv, Computer, Fan, Thermometer } from 'lucide-react'

interface DeviceData {
  device_id: string
  device_type: string
  energy_consumption: number
  usage_time: number
  room: string
  efficiency_rating: number
}

interface DeviceState {
  [key: string]: boolean
}

interface Props {
  deviceData: DeviceData[]
}

const deviceIcons: { [key: string]: React.ReactNode } = {
  'Light': <Lightbulb className="w-4 h-4 mr-2" />,
  'TV': <Tv className="w-4 h-4 mr-2" />,
  'Computer': <Computer className="w-4 h-4 mr-2" />,
  'Fan': <Fan className="w-4 h-4 mr-2" />,
  'Thermostat': <Thermometer className="w-4 h-4 mr-2" />,
}

export default function SmartHomeIntegration({ deviceData }: Props) {
  const [deviceStates, setDeviceStates] = useState<DeviceState>({})

  // Initialize device states on mount
  useEffect(() => {
    const initialStates = deviceData.reduce((acc, device) => {
      acc[device.device_id] = false
      return acc
    }, {} as DeviceState)
    setDeviceStates(initialStates)
  }, [deviceData])

  const handleToggleDevice = (deviceId: string) => {
    setDeviceStates(prev => ({
      ...prev,
      [deviceId]: !prev[deviceId]
    }))
  }

  const DeviceItem = ({ device }: { device: DeviceData }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {deviceIcons[device.device_type] || <Lightbulb className="w-4 h-4 mr-2" />}
        <span className="text-sm font-medium">
          {device.device_type} ({device.room})
        </span>
      </div>
      <Switch 
        checked={deviceStates[device.device_id] || false}
        onCheckedChange={() => handleToggleDevice(device.device_id)}
        aria-label={`Toggle ${device.device_type}`}
      />
    </div>
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Smart Home Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deviceData.map(device => (
            <DeviceItem key={device.device_id} device={device} />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Tip: Turn off devices when not in use to save energy.
        </p>
      </CardContent>
    </Card>
  )
}