"use client";
import React, { useState } from "react";
import { MessageSquare, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Predefined sustainable travel advice database
const sustainableAdvice = {
  transport: {
    title: "Eco-Friendly Transportation",
    advice: `Consider these sustainable transportation options:
    1. Use local public transportation systems
    2. Rent electric or hybrid vehicles
    3. Choose direct flights when flying is necessary
    4. Use bike-sharing programs for short distances
    5. Walk when possible to explore local areas`,
  },
  accommodation: {
    title: "Sustainable Accommodation",
    advice: `Tips for eco-friendly stays:
    1. Book hotels with green certifications
    2. Choose locally-owned accommodations
    3. Stay in places that use renewable energy
    4. Look for properties with water conservation practices
    5. Support eco-lodges and sustainable resorts`,
  },
  activities: {
    title: "Environmental Activities",
    advice: `Sustainable activity recommendations:
    1. Join local conservation projects
    2. Support eco-tourism initiatives
    3. Participate in beach or trail cleanups
    4. Visit protected natural areas
    5. Choose tour operators with environmental commitments`,
  },
};

const AISustainabilityAdvisor = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  interface SustainableAdvice {
    title: string;
    advice: string;
  }

  interface SustainableAdviceDatabase {
    transport: SustainableAdvice;
    accommodation: SustainableAdvice;
    activities: SustainableAdvice;
  }

  const sustainableAdvice: SustainableAdviceDatabase = {
    transport: {
      title: "Eco-Friendly Transportation",
      advice: `Consider these sustainable transportation options:
      1. Use local public transportation systems
      2. Rent electric or hybrid vehicles
      3. Choose direct flights when flying is necessary
      4. Use bike-sharing programs for short distances
      5. Walk when possible to explore local areas`,
    },
    accommodation: {
      title: "Sustainable Accommodation",
      advice: `Tips for eco-friendly stays:
      1. Book hotels with green certifications
      2. Choose locally-owned accommodations
      3. Stay in places that use renewable energy
      4. Look for properties with water conservation practices
      5. Support eco-lodges and sustainable resorts`,
    },
    activities: {
      title: "Environmental Activities",
      advice: `Sustainable activity recommendations:
      1. Join local conservation projects
      2. Support eco-tourism initiatives
      3. Participate in beach or trail cleanups
      4. Visit protected natural areas
      5. Choose tour operators with environmental commitments`,
    },
  };

  const getAdviceCategory = (
    query: string
  ): keyof SustainableAdviceDatabase => {
    const queryLower = query.toLowerCase();
    if (
      queryLower.includes("transport") ||
      queryLower.includes("travel") ||
      queryLower.includes("car") ||
      queryLower.includes("fly")
    ) {
      return "transport";
    }
    if (
      queryLower.includes("hotel") ||
      queryLower.includes("stay") ||
      queryLower.includes("accommodation")
    ) {
      return "accommodation";
    }
    return "activities";
  };

  const getAIAdvice = async () => {
    setLoading(true);
    setError("");
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const category = getAdviceCategory(query);
      const advice = sustainableAdvice[category];

      const response = `${advice.title}\n\n${
        advice.advice
      }\n\nCustom recommendation based on your query "${query}":\n${generateCustomAdvice(
        query,
        category
      )}`;

      setResponse(response);
    } catch (err) {
      setError("Failed to get advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateCustomAdvice = (
    query: string,
    category: keyof SustainableAdviceDatabase
  ): string => {
    // Simple custom advice generation based on query keywords
    const queryLower = query.toLowerCase();
    if (category === "transport") {
      if (queryLower.includes("fly")) {
        return "Consider purchasing carbon offsets for your flight and pack light to reduce fuel consumption.";
      }
      if (queryLower.includes("car")) {
        return "Look for electric vehicle rentals or carpooling options to minimize your carbon footprint.";
      }
    }
    if (category === "accommodation") {
      if (queryLower.includes("hotel")) {
        return "Research hotels with LEED certification or similar environmental standards.";
      }
    }
    return "Consider joining local environmental initiatives during your stay to contribute positively to the destination.";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">
        AI Travel Sustainability Advisor
      </h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about transportation, accommodation, or activities..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
          />
          <button
            onClick={getAIAdvice}
            disabled={loading || !query}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}
            Get Advice
          </button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {response && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-800 whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISustainabilityAdvisor;
