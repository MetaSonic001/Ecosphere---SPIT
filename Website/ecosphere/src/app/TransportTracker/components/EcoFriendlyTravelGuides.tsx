"use client";
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Hotel, MapPin, Activity } from 'lucide-react';

export default function EcoFriendlyTravelGuides() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const guides = [
    { id: 'eco-accommodations', icon: Hotel, title: 'Eco-Friendly Accommodations' },
    { id: 'green-transportation', icon: MapPin, title: 'Green Transportation' },
    { id: 'sustainable-activities', icon: Activity, title: 'Sustainable Activities' },
  ];

  const getColorClasses = (color: string) => ({
    card: `bg-${color}-50 hover:bg-${color}-100 border-${color}-200`,
    title: `text-${color}-800`,
    icon: `text-${color}-500`,
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Eco-Friendly Travel Guides</h2>
      <div className="space-y-4">
        {guides.map((guide) => {
          const isExpanded = expandedId === guide.id;
          const colors = getColorClasses('indigo');

          return (
            <div key={guide.id} className={`border rounded-lg overflow-hidden transition-all duration-300 ${colors.card}`}>
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : guide.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-white ${colors.icon}`}>
                      <guide.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-semibold ${colors.title}`}>
                      {guide.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                {/* The section below can be expanded or collapsed, but doesn't show a description anymore */}
                <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
                  {/* This section can be used for additional details or actions in the future */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
