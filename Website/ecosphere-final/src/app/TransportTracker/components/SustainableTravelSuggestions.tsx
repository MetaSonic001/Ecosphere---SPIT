"use client";
import { Leaf, Users, Train } from 'lucide-react'

export default function SustainableTravelSuggestions() {
  const suggestions = [
    { icon: Leaf, text: 'Choose eco-friendly routes' },
    { icon: Users, text: 'Consider carpooling options' },
    { icon: Train, text: 'Utilize public transportation' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-teal-600">Sustainable Travel Suggestions</h2>
      <ul className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-center bg-teal-50 p-3 rounded-lg">
            <suggestion.icon className="w-6 h-6 text-teal-500 mr-3" />
            <span className="text-teal-800">{suggestion.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}