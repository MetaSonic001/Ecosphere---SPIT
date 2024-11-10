'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Progress } from '../../../components/ui/progress'

export function SustainabilityChallenges({ userData }) {
  const [challenges, setChallenges] = useState([])

  useEffect(() => {
    fetchChallenges()
  }, [userData])

  const fetchChallenges = async () => {
    try {
      // API call to get current challenges
      const response = await fetch('/api/trpc/get-challenges')
      const data = await response.json()
      setChallenges(data)
    } catch (error) {
      console.error('Error fetching challenges:', error)
    }
  }

  const joinChallenge = async (challengeId) => {
    try {
      // API call to join a challenge
      await fetch(`/api/trpc/join-challenge/${challengeId}`, { method: 'POST' })
      fetchChallenges() // Refresh challenges after joining
    } catch (error) {
      console.error('Error joining challenge:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">{challenge.name}</h3>
            <p>{challenge.description}</p>
            <Progress value={challenge.progress} className="mt-2" />
            <p className="text-sm text-gray-600 mt-1">Progress: {challenge.progress}%</p>
            {!challenge.joined && (
              <Button onClick={() => joinChallenge(challenge.id)} className="mt-2">
                Join Challenge
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}