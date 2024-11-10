'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select'
import { toast } from "../../../hooks/use-toast";

export function EcoFitnessTracker({ userData }) {
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState({ type: '', duration: '', distance: '' })

  useEffect(() => {
    fetchActivities()
  }, [userData])

  const fetchActivities = async () => {
    try {
      // API call to get user's eco-fitness activities
      const response = await fetch('/api/trpc/get-eco-fitness-activities')
      const data = await response.json()
      setActivities(data)
    } catch (error) {
      console.error('Error fetching eco-fitness activities:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // API call to log new eco-fitness activity
      const response = await fetch('/api/trpc/log-eco-fitness-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      })
      if (response.ok) {
        toast({
          title: "Activity Logged",
          description: "Your eco-fitness activity has been recorded.",
        })
        setNewActivity({ type: '', duration: '', distance: '' })
        fetchActivities() // Refresh activities after logging
      } else {
        throw new Error('Failed to log activity')
      }
    } catch (error) {
      console.error('Error logging eco-fitness activity:', error)
      toast({
        title: "Error",
        description: "Failed to log activity. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eco-Friendly Fitness Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Select
            name="type"
            value={newActivity.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Activity Type</option>
            <option value="walking">Walking</option>
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
          </Select>
          <Input
            type="number"
            name="duration"
            value={newActivity.duration}
            onChange={handleInputChange}
            placeholder="Duration (minutes)"
            required
          />
          <Input
            type="number"
            name="distance"
            value={newActivity.distance}
            onChange={handleInputChange}
            placeholder="Distance (km)"
            required
          />
          <Button type="submit">Log Activity</Button>
        </form>
        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
          {activities.map((activity, index) => (
            <div key={index} className="mb-2">
              <p>{activity.type} - {activity.duration} minutes, {activity.distance} km</p>
              <p className="text-sm text-green-600">Carbon saved: {activity.carbonSaved} kg CO2</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}