"use client";
import { useState } from 'react';
import { Trees, Wind, Sun, MapPin } from 'lucide-react';

export default function CarbonOffsetOptions() {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cityInfo, setCityInfo] = useState<{ carbonEmissions: string; description: string } | null>(null);

  // Database of cities with their carbon emission and description
  const cityDetails = {
    'delhi': {
      carbonEmissions: 'High',
      description: 'Delhi is one of the most polluted cities with high carbon emissions due to heavy traffic and industrial activities.'
    },
    'mumbai': {
      carbonEmissions: 'Moderate',
      description: 'Mumbai has a moderate level of carbon emissions due to its high population density and transportation sector.'
    },
    'bangalore': {
      carbonEmissions: 'Moderate',
      description: 'Bangalore’s carbon emissions come mostly from the growing tech industry and urban transport.'
    },
    'hyderabad': {
      carbonEmissions: 'Moderate',
      description: 'Hyderabad’s carbon footprint is driven by its rapidly growing tech sector and transportation needs.'
    },
    'chennai': {
      carbonEmissions: 'Moderate',
      description: 'Chennai’s carbon emissions mainly result from industrial activities and high traffic congestion.'
    },
    'kolkata': {
      carbonEmissions: 'High',
      description: 'Kolkata struggles with high pollution levels, especially from industrial sources and vehicle emissions.'
    },
    'pune': {
      carbonEmissions: 'Moderate',
      description: 'Pune’s pollution stems from rapid urbanization, industrial growth, and increasing transport needs.'
    },
    'ahmedabad': {
      carbonEmissions: 'Moderate',
      description: 'Ahmedabad is facing growing transportation and industrial emissions that affect its air quality.'
    },
    'kochi': {
      carbonEmissions: 'Low',
      description: 'Kochi has relatively low emissions, supported by initiatives like the water metro.'
    },
    'jaipur': {
      carbonEmissions: 'Moderate',
      description: 'Jaipur’s emissions are growing as it faces rising urbanization and vehicle usage.'
    },
    'lucknow': {
      carbonEmissions: 'High',
      description: 'Lucknow faces increasing emissions from transportation as the city rapidly urbanizes.'
    },
    'chandigarh': {
      carbonEmissions: 'Low',
      description: 'Chandigarh has made considerable efforts in managing emissions, but transportation remains a key challenge.'
    },
    'noida': {
      carbonEmissions: 'High',
      description: 'Noida has a high rate of emissions, largely due to industrial activities and urban transportation.'
    },
    'indore': {
      carbonEmissions: 'Moderate',
      description: 'Indore is experiencing moderate pollution, especially from vehicles and industrial activities.'
    },
    'surat': {
      carbonEmissions: 'High',
      description: 'Surat has a high level of carbon emissions from industrial production and transportation.'
    },
    'vijayawada': {
      carbonEmissions: 'Moderate',
      description: 'Vijayawada faces moderate pollution mainly from urbanization and transportation.'
    },
    'patna': {
      carbonEmissions: 'High',
      description: 'Patna has high carbon emissions from industrial activities and growing transportation needs.'
    },
    'nashik': {
      carbonEmissions: 'Moderate',
      description: 'Nashik faces moderate pollution due to an increase in transportation and industrial emissions.'
    },
    'bhubaneswar': {
      carbonEmissions: 'Low',
      description: 'Bhubaneswar is relatively low in emissions, but transportation remains a growing concern.'
    },
    'rajkot': {
      carbonEmissions: 'Moderate',
      description: 'Rajkot faces moderate emissions from increasing industrialization and urban expansion.'
    },
    'ujjain': {
      carbonEmissions: 'Low',
      description: 'Ujjain has relatively lower carbon emissions but still needs to work on sustainable transport options.'
    },
    'dehradun': {
      carbonEmissions: 'Moderate',
      description: 'Dehradun faces moderate carbon emissions, primarily from growing traffic and transportation.'
    },
    'agra': {
      carbonEmissions: 'Moderate',
      description: 'Agra has moderate carbon emissions, mainly from tourism-related transportation and local vehicles.'
    },
    'goa': {
      carbonEmissions: 'Low',
      description: 'Goa’s emissions are relatively low but growing due to tourism and transportation.'
    },
    'madurai': {
      carbonEmissions: 'Moderate',
      description: 'Madurai has moderate carbon emissions mainly from transportation and local industry.'
    },
    'nagpur': {
      carbonEmissions: 'Moderate',
      description: 'Nagpur’s emissions are mainly from transportation and industrial activities.'
    },
    'kanpur': {
      carbonEmissions: 'High',
      description: 'Kanpur has high emissions mainly from industrial activities and heavy transportation.'
    },
    'coimbatore': {
      carbonEmissions: 'Moderate',
      description: 'Coimbatore’s carbon emissions are moderate due to industrial growth and urban expansion.'
    },
    'belagavi': {
      carbonEmissions: 'Low',
      description: 'Belagavi has low carbon emissions but still needs more eco-friendly transportation solutions.'
    },
    'mangalore': {
      carbonEmissions: 'Moderate',
      description: 'Mangalore is experiencing moderate emissions from transport and industrial activities.'
    },
    'rajahmundry': {
      carbonEmissions: 'Moderate',
      description: 'Rajahmundry is seeing moderate emissions from transport and local industries.'
    },
    'kottayam': {
      carbonEmissions: 'Low',
      description: 'Kottayam has relatively low emissions but needs more electric transport solutions.'
    },
    'jodhpur': {
      carbonEmissions: 'Moderate',
      description: 'Jodhpur has moderate emissions due to growing urbanization and transportation.'
    },
    'bhopal': {
      carbonEmissions: 'Moderate',
      description: 'Bhopal faces moderate pollution from transportation and industrial activities.'
    },
  };

  // Function to determine carbon offset suggestions based on location
  const getOffsetSuggestions = (city: string) => {
    const lowerCity = city.toLowerCase();
    let suggestionsList: string[] = [];
    let info = null;

    // City details logic
    if (cityDetails[lowerCity]) {
      info = cityDetails[lowerCity];
    } else {
      info = { carbonEmissions: 'Unknown', description: 'City not found in the database.' };
    }

    // Suggest Solar Panel, Windmill, and Planting Trees based on emission level
    if (info.carbonEmissions === 'High') {
      suggestionsList.push('Install Solar Panels in urban areas to reduce reliance on non-renewable energy sources.');
      suggestionsList.push('Develop Wind Farms in areas with high wind potential to provide clean energy.');
      suggestionsList.push('Plant Trees to help absorb carbon and improve air quality.');
    } else if (info.carbonEmissions === 'Moderate') {
      suggestionsList.push('Invest in Solar Panels for residential and commercial areas.');
      suggestionsList.push('Support Windmill projects in coastal areas.');
      suggestionsList.push('Increase Tree Planting programs in parks and open spaces.');
    } else {
      suggestionsList.push('Promote Solar Panel use for sustainable energy solutions.');
      suggestionsList.push('Develop small Windmills in areas with significant open land.');
      suggestionsList.push('Continue efforts to plant Trees for long-term environmental benefits.');
    }

    setSuggestions(suggestionsList);
    setCityInfo(info); // Set city-specific data
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getOffsetSuggestions(location);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
      <div className="text-2xl font-bold mb-4 text-green-700">Carbon Offset Options</div>
      
      <form onSubmit={handleLocationSubmit} className="mb-6">
        <div className="flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-gray-500" />
          <input
            type="text"
            placeholder="Enter your location..."
            className="p-2 border rounded-lg w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Submit
          </button>
        </div>
      </form>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700">Choose an initiative to offset your carbon emissions:</p>
        <ul className="mt-4 space-y-4">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-700 p-2 border-b">
                {suggestion}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No suggestions yet. Please enter a valid city.</li>
          )}
        </ul>
      </div>

      {/* Display carbon emission information for the city */}
      {cityInfo && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-xl text-gray-800">Carbon Emissions in {location}</h4>
          <p className="text-gray-700">{cityInfo.description}</p>
          <p className="mt-2 text-lg font-semibold text-gray-600">Carbon Emissions: {cityInfo.carbonEmissions}</p>
        </div>
      )}
    </div>
  );
}
