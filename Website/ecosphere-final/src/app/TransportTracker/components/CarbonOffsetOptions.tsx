"use client";
import React, { useState } from "react";
import {
  Trees,
  Wind,
  Sun,
  MapPin,
  Loader2,
  RefreshCw,
  Award,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Simulated database of recommendations by region type
const regionalRecommendations = {
  urban: {
    challenges: "Air pollution, high energy consumption, limited green spaces",
    strategies:
      "Solar installations, energy efficiency programs, urban forestry",
    projects: "Community gardens, building retrofits, public transport",
    impact: "Potential 25% carbon reduction within 2 years",
    timeline: "Immediate to 24 months",
  },
  rural: {
    challenges:
      "Agricultural emissions, deforestation, limited renewable infrastructure",
    strategies: "Reforestation, sustainable farming, wind energy",
    projects: "Forest conservation, organic farming transition, wind farms",
    impact: "Potential 30% carbon reduction within 3 years",
    timeline: "6-36 months",
  },
  coastal: {
    challenges: "Rising sea levels, marine ecosystem damage, tourism impact",
    strategies: "Marine conservation, sustainable tourism, coastal restoration",
    projects: "Mangrove restoration, eco-tourism initiatives, wave energy",
    impact: "Potential 20% carbon reduction within 2 years",
    timeline: "12-24 months",
  },
};

const defaultProjects = [
  {
    id: 1,
    name: "Community Solar Initiative",
    type: "Solar",
    impact: "500 tons CO2/year",
    cost: "$15/credit",
    timeline: "6 months",
    description: "Installing solar panels on community buildings",
  },
  {
    id: 2,
    name: "Urban Wind Farm",
    type: "Wind",
    impact: "750 tons CO2/year",
    cost: "$12/credit",
    timeline: "12 months",
    description: "Small-scale wind turbines in industrial areas",
  },
  {
    id: 3,
    name: "Local Reforestation Project",
    type: "Reforestation",
    impact: "300 tons CO2/year",
    cost: "$10/credit",
    timeline: "24 months",
    description: "Planting native trees in degraded areas",
  },
];

const CarbonOffsetOptions = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState("");
  interface Project {
    id: number;
    name: string;
    type: string;
    impact: string;
    cost: string;
    timeline: string;
    description: string;
    score?: number;
  }

  const [offsetProjects, setOffsetProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [error, setError] = useState("");

  interface RegionalRecommendations {
    challenges: string;
    strategies: string;
    projects: string;
    impact: string;
    timeline: string;
  }

  interface Recommendations {
    urban: RegionalRecommendations;
    rural: RegionalRecommendations;
    coastal: RegionalRecommendations;
  }

  const regionalRecommendations: Recommendations = {
    urban: {
      challenges:
        "Air pollution, high energy consumption, limited green spaces",
      strategies:
        "Solar installations, energy efficiency programs, urban forestry",
      projects: "Community gardens, building retrofits, public transport",
      impact: "Potential 25% carbon reduction within 2 years",
      timeline: "Immediate to 24 months",
    },
    rural: {
      challenges:
        "Agricultural emissions, deforestation, limited renewable infrastructure",
      strategies: "Reforestation, sustainable farming, wind energy",
      projects: "Forest conservation, organic farming transition, wind farms",
      impact: "Potential 30% carbon reduction within 3 years",
      timeline: "6-36 months",
    },
    coastal: {
      challenges: "Rising sea levels, marine ecosystem damage, tourism impact",
      strategies:
        "Marine conservation, sustainable tourism, coastal restoration",
      projects: "Mangrove restoration, eco-tourism initiatives, wave energy",
      impact: "Potential 20% carbon reduction within 2 years",
      timeline: "12-24 months",
    },
  };

  const getRegionType = (location: string): keyof Recommendations => {
    const locationLower = location.toLowerCase();
    if (locationLower.includes("city") || locationLower.includes("metro"))
      return "urban";
    if (locationLower.includes("coast") || locationLower.includes("beach"))
      return "coastal";
    return "rural";
  };

  const getAIOffsetRecommendations = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const regionType = getRegionType(location);
      const recommendations = regionalRecommendations[regionType];

      const formattedSuggestions = `
        Local Challenges: ${recommendations.challenges}
        
        Recommended Strategies: ${recommendations.strategies}
        
        Suggested Projects: ${recommendations.projects}
        
        Expected Impact: ${recommendations.impact}
        
        Implementation Timeline: ${recommendations.timeline}
      `;

      setAiSuggestions(formattedSuggestions);

      // Set default projects with randomized impact scores
      const projectsWithScores = defaultProjects.map((project) => ({
        ...project,
        score: Math.floor(Math.random() * 30) + 70, // Score between 70-100
      }));

      setOffsetProjects(projectsWithScores);
    } catch (err) {
      setError("Failed to analyze location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const offsetIcons = {
    Solar: Sun,
    Wind: Wind,
    Reforestation: Trees,
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emerald-600">
          Smart Carbon Offset
        </h2>
        <RefreshCw
          className="text-emerald-500 w-6 h-6 cursor-pointer hover:rotate-180 transition-transform duration-500"
          onClick={() => {
            setLocation("");
            setAiSuggestions("");
            setOffsetProjects([]);
            setSelectedProject(null);
          }}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-emerald-500" />
          <input
            type="text"
            placeholder="Enter your location (e.g., coastal city, rural area)..."
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-emerald-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            onClick={getAIOffsetRecommendations}
            disabled={loading || !location}
            className="p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analyze"}
          </button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {aiSuggestions && (
          <div className="bg-emerald-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-emerald-700">
              Location Analysis:
            </h3>
            <p className="text-emerald-600 whitespace-pre-line">
              {aiSuggestions}
            </p>
          </div>
        )}

        {offsetProjects.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-emerald-700">
              Recommended Offset Projects
            </h3>
            <div className="grid gap-4">
              {offsetProjects.map((project) => {
                const Icon =
                  offsetIcons[project.type as keyof typeof offsetIcons];

                return (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedProject === project.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Icon className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-700">
                            {project.name}
                          </h4>
                          <p className="text-sm text-emerald-600">
                            {project.impact}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-700 font-semibold">
                          {project.score}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between text-sm text-emerald-600">
                      <span>{project.cost}</span>
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonOffsetOptions;
