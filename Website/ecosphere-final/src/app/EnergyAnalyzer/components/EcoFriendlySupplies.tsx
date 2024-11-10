import { CheckCircle } from 'lucide-react'

const ecoFriendlySupplies = [
  { name: 'Recycled Paper', description: '100% post-consumer recycled content' },
  { name: 'Reusable Notebooks', description: 'Wipeable pages for multiple uses' },
  { name: 'LED Desk Lamp', description: 'Energy-efficient lighting' },
  { name: 'Bamboo Desk Organizer', description: 'Sustainable and biodegradable' },
  { name: 'Refillable Pens', description: 'Reduce plastic waste from disposable pens' },
]

export default function EcoFriendlySupplies() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Eco-Friendly Supplies Suggestions</h2>
      <ul className="space-y-3">
        {ecoFriendlySupplies.map((supply, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <span className="font-medium">{supply.name}</span>
              <p className="text-sm text-gray-600">{supply.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-gray-600">
        Tip: Choose eco-friendly supplies to reduce your environmental impact.
      </p>
    </div>
  )
}