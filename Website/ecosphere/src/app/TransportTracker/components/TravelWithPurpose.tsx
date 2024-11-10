"use client";
import { Globe, Heart, Leaf } from 'lucide-react'

export default function TravelWithPurpose() {
  const purposefulTravelOptions = [
    { icon: Globe, title: 'Eco-Tourism Destinations', description: 'Explore environmentally responsible locations' },
    { icon: Heart, title: 'Volunteer Opportunities', description: 'Contribute to local communities while traveling' },
    { icon: Leaf, title: 'Sustainable Adventures', description: 'Engage in low-impact, nature-based activities' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Travel with a Purpose</h2>
      <p className="text-gray-600 mb-4">Discover meaningful and eco-conscious travel experiences:</p>
      <div className="space-y-4">
        {purposefulTravelOptions.map((option, index) => (
          <div key={index} className="bg-emerald-50 p-4 rounded-lg flex items-start">
            <option.icon className="w-6 h-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-emerald-800">{option.title}</h3>
              <p className="text-emerald-600 text-sm">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}