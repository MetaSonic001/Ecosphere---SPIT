'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

export function FootprintSuggestions({ userData }) {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    fetchSuggestions()
  }, [userData])

  const fetchSuggestions = async () => {
    try {
      // API call to get personalized suggestions based on user data
      const response = await fetch('/api/trpc/get-suggestions')
      const data = await response.json()
      setSuggestions(data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions to Reduce Your Footprint</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}