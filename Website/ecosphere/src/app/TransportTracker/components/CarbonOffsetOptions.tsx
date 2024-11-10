'use client'

import { useState, useEffect } from 'react';
import { Trees, Wind, Sun, MapPin, Loader2, RefreshCw, Award } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const CarbonOffsetOptions = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string>('');
  const [offsetProjects, setOffsetProjects] = useState<unknown[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [impactScore, setImpactScore] = useState<number>(0);

  const getAIOffsetRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `As a carbon offset advisor, provide detailed recommendations for ${location}:
            1. Local environmental challenges
            2. Most effective offset strategies
            3. Community-specific projects
            4. Expected impact metrics
            5. Implementation timeline`
        })
      });
      
      const data = await response.json();
      setAiSuggestions(data.response);
      
      // Simulate getting offset projects based on AI recommendations
      generateOffsetProjects();
    } catch (err) {
      setError('Failed to get offset recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateOffsetProjects = async () => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 3 specific carbon offset projects for ${location} including:
            1. Project name
            2. Type (Solar/Wind/Reforestation)
            3. Expected impact
            4. Cost per carbon credit
            5. Implementation timeline`
        })
      });
      
      const data = await response.json();
      // Parse the AI response and structure it into projects
      const projects = parseAIProjectResponse(data.response);
      setOffsetProjects(projects);
    } catch (err) {
      console.error('Failed to generate projects');
    }
  };

  const parseAIProjectResponse = (response: string) => {
    // This would parse the AI response into structured project data
    // Simplified example:
    return [
      {
        id: 1,
        name: 'Local Solar Initiative',
        type: 'Solar',
        impact: '500 tons CO2/year',
        cost: '$15/credit',
        timeline: '6 months'
      },
      // Add more parsed projects...
    ];
  };

  const calculateImpactScore = (project: any) => {
    // This would calculate a normalized impact score
    return Math.random() * 100;
  };

  const offsetIcons = {
    Solar: Sun,
    Wind: Wind,
    Reforestation: Trees
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emerald-600">Smart Carbon Offset</h2>
        <RefreshCw className="text-emerald-500 w-6 h-6" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-emerald-500" />
          <input
            type="text"
            placeholder="Enter your location..."
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-emerald-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            onClick={getAIOffsetRecommendations}
            disabled={loading || !location}
            className="p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
          </button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {aiSuggestions && (
          <div className="bg-emerald-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-emerald-700">AI Recommendations:</h3>
            <p className="text-emerald-600 whitespace-pre-line">{aiSuggestions}</p>
          </div>
        )}

        {offsetProjects.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-emerald-700">Available Offset Projects</h3>
            <div className="grid gap-4">
              {offsetProjects.map((project) => {
                const Icon = offsetIcons[project.type as keyof typeof offsetIcons];
                const score = calculateImpactScore(project);
                
                return (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedProject === project.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Icon className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-700">{project.name}</h4>
                          <p className="text-sm text-emerald-600">{project.impact}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-500" />
                        <span className="text-emerald-700 font-semibold">{score.toFixed(0)}</span>
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