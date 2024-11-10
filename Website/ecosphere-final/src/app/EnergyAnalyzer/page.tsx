  'use client'

  import { useState, useEffect } from 'react'
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Switch } from "@/components/ui/switch"
  import { Slider } from "@/components/ui/slider"
  import { Bar } from 'react-chartjs-2'
  import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
  import { Lightbulb, Tv, Computer, Fan, Thermometer, PlusCircle, X } from 'lucide-react'
  import CarbonEmissionPredictor from '../EnergyAnalyzer/components/CarbonEmissionPredictor'

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  interface DeviceData {
    device_id: string
    device_type: string
    energy_consumption: number
    usage_time: number
    room: string
    efficiency_rating: number
    is_on: boolean
  }

  interface Notification {
    id: number
    message: string
    type: 'success' | 'error'
  }

  const deviceIcons: { [key: string]: React.ReactNode } = {
    'Light': <Lightbulb className="w-4 h-4 mr-2" />,
    'TV': <Tv className="w-4 h-4 mr-2" />,
    'Computer': <Computer className="w-4 h-4 mr-2" />,
    'Fan': <Fan className="w-4 h-4 mr-2" />,
    'Thermostat': <Thermometer className="w-4 h-4 mr-2" />,
  }

  const deviceTypes = ['Light', 'TV', 'Computer', 'Fan', 'Thermostat']
  const rooms = ['Living Room', 'Bedroom', 'Office', 'Kitchen', 'Bathroom']

  export default function EnhancedDashboard() {
    const [deviceData, setDeviceData] = useState<DeviceData[]>([])
    const [newDevice, setNewDevice] = useState({
      device_type: deviceTypes[0],
      room: rooms[0],
      energy_consumption: '',
      usage_time: '',
      efficiency_rating: 5
    })
    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {
      const savedDevices = localStorage.getItem('smartHomeDevices')
      if (savedDevices) {
        setDeviceData(JSON.parse(savedDevices))
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('smartHomeDevices', JSON.stringify(deviceData))
    }, [deviceData])

    const addNotification = (message: string, type: 'success' | 'error') => {
      const id = Date.now()
      setNotifications(prev => [...prev, { id, message, type }])
      setTimeout(() => {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
      }, 5000)
    }

    const removeNotification = (id: number) => {
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    }

    const addDevice = () => {
      const energyConsumption = parseFloat(newDevice.energy_consumption)
      const usageTime = parseFloat(newDevice.usage_time)

      if (isNaN(energyConsumption) || isNaN(usageTime) || energyConsumption < 0 || usageTime < 0) {
        addNotification("Please enter valid positive numbers for energy consumption and usage time.", "error")
        return
      }

      if (usageTime > 24) {
        addNotification("Usage time cannot exceed 24 hours per day.", "error")
        return
      }

      const device: DeviceData = {
        device_id: `device-${Date.now()}`,
        device_type: newDevice.device_type,
        room: newDevice.room,
        energy_consumption: energyConsumption,
        usage_time: usageTime,
        efficiency_rating: newDevice.efficiency_rating,
        is_on: true
      }
      setDeviceData([...deviceData, device])
      setNewDevice({
        device_type: deviceTypes[0],
        room: rooms[0],
        energy_consumption: '',
        usage_time: '',
        efficiency_rating: 5
      })
      addNotification(`${device.device_type} has been added to ${device.room}.`, "success")
    }

    const handleToggleDevice = (deviceId: string) => {
      setDeviceData(prevData =>
        prevData.map(device =>
          device.device_id === deviceId ? { ...device, is_on: !device.is_on } : device
        )
      )
    }

    const handleAdjustThermostat = (deviceId: string, value: number) => {
      setDeviceData(prevData =>
        prevData.map(device =>
          device.device_id === deviceId ? { ...device, energy_consumption: parseFloat((value * 0.1).toFixed(2)) } : device
        )
      )
    }

    const getTotalEnergyConsumption = () =>
      parseFloat(deviceData.reduce((sum, device) => sum + (device.is_on ? device.energy_consumption : 0), 0).toFixed(2))

    const getEnergyConsumptionByRoom = () => {
      const roomData: { [key: string]: number } = {}
      deviceData.forEach(device => {
        if (!roomData[device.room]) roomData[device.room] = 0
        if (device.is_on) roomData[device.room] += device.energy_consumption
      })
      return Object.fromEntries(
        Object.entries(roomData).map(([room, consumption]) => [room, parseFloat(consumption.toFixed(2))])
      )
    }

    const renderEnergyConsumptionChart = () => {
      const roomData = getEnergyConsumptionByRoom()
      const chartData = {
        labels: Object.keys(roomData),
        datasets: [{
          label: 'Energy Consumption (kWh)',
          data: Object.values(roomData),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
      }

      return <Bar data={chartData} options={{ responsive: true }} />
    }

    const renderDeviceForm = () => (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="device-type">Device Type</Label>
            <select
              id="device-type"
              className="w-full p-2 border rounded"
              value={newDevice.device_type}
              onChange={(e) => setNewDevice({ ...newDevice, device_type: e.target.value })}
            >
              {deviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="room">Room</Label>
            <select
              id="room"
              className="w-full p-2 border rounded"
              value={newDevice.room}
              onChange={(e) => setNewDevice({ ...newDevice, room: e.target.value })}
            >
              {rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="energy-consumption">Energy Consumption (kWh)</Label>
            <Input
              id="energy-consumption"
              type="number"
              min="0"
              step="0.01"
              value={newDevice.energy_consumption}
              onChange={(e) => setNewDevice({ ...newDevice, energy_consumption: e.target.value })}
              placeholder="Enter energy consumption"
            />
          </div>
          <div>
            <Label htmlFor="usage-time">Usage Time (hours/day)</Label>
            <Input
              id="usage-time"
              type="number"
              min="0"
              max="24"
              step="0.1"
              value={newDevice.usage_time}
              onChange={(e) => setNewDevice({ ...newDevice, usage_time: e.target.value })}
              placeholder="Enter usage time"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="efficiency">Efficiency Rating (1-10)</Label>
          <div className="flex items-center space-x-2">
            <Slider
              id="efficiency"
              min={1}
              max={10}
              step={1}
              value={[newDevice.efficiency_rating]}
              onValueChange={(value) => setNewDevice({ ...newDevice, efficiency_rating: value[0] })}
              className="flex-grow"
            />
            <span className="w-8 text-center">{newDevice.efficiency_rating}</span>
          </div>
        </div>
        <Button onClick={addDevice} className="w-full">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>
    )

    const renderDeviceList = () => (
      <div className="space-y-4">
        {deviceData.map(device => (
          <div key={device.device_id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
              {deviceIcons[device.device_type]}
              <div className="ml-2">
                <p className="font-medium">{device.device_type}</p>
                <p className="text-sm text-gray-600">{device.room}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">{device.energy_consumption.toFixed(2)} kWh</p>
              {device.device_type === 'Thermostat' ? (
                <>
                  <Slider
                    min={15}
                    max={30}
                    step={0.5}
                    value={[device.energy_consumption * 10]}
                    onValueChange={(value) => handleAdjustThermostat(device.device_id, value[0])}
                    className="w-24"
                  />
                  <span className="ml-2">{(device.energy_consumption * 10).toFixed(1)}°C</span>
                </>
              ) : (
                <Switch
                  checked={device.is_on}
                  onCheckedChange={() => handleToggleDevice(device.device_id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    )

    const renderNotifications = () => (
      <div className="fixed top-4 right-4 z-50">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`mb-2 p-4 rounded-md shadow-md flex items-center justify-between ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    )

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Smart Home Energy Dashboard</h1>
        {renderNotifications()}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Device</CardTitle>
            </CardHeader>
            <CardContent>{renderDeviceForm()}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Device Control</CardTitle>
            </CardHeader>
            <CardContent>{renderDeviceList()}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Total Energy Consumption: {getTotalEnergyConsumption()} kWh</p>
              {renderEnergyConsumptionChart()}
            </CardContent>
          </Card>
          <CarbonEmissionPredictor deviceData={deviceData} />
        </div>
      </div>
    )
  }