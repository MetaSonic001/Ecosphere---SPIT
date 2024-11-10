'use client'

import { useState, useEffect } from 'react';
import { Car, Bike, Bus, Footprints, Train, Plane, Loader2, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const TransportModeAnalysis = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emissionHistory, setEmissionHistory] = useState<any[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');

  const transportModes = [
    { name: 'Car', icon: Car },
    { name: 'Bus', icon: Bus },
    { name: 'Bike', icon: Bike },
    { name: 'Walking', icon: Footprints },
    { name: 'Train', icon: Train },
    { name: 'Plane', icon: Plane },
  ];

  const getAIRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `As a sustainable transport advisor, analyze this journey:
            Mode: ${selectedMode}
            Distance: ${distance}km
            
            Provide:
            1. Environmental impact analysis
            2. Sustainable alternatives
            3. Specific recommendations for reducing emissions
            4. Potential carbon savings tips`
        })
      });
      
      const data = await response.json();
      setAiRecommendation(data.response);
      
      // Simulate adding to history
      const newEmission = {
        date: new Date().toLocaleDateString(),
        mode: selectedMode,
        distance: parseFloat(distance),
        emissions: calculateEmissions(selectedMode!, parseFloat(distance))
      };
      setEmissionHistory(prev => [...prev, newEmission]);
    } catch (err) {
      setError('Failed to get AI recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateEmissions = (mode: string, dist: number) => {
    // Simplified emission calculation
    const factors: { [key: string]: number } = {
      Car: 0.2,
      Bus: 0.08,
      Bike: 0,
      Walking: 0,
      Train: 0.04,
      Plane: 0.25
    };
    return factors[mode] * dist;
  };

  useEffect(() => {
    if (emissionHistory.length > 0) {
      analyzeEmissionTrends();
    }
  }, [emissionHistory]);

  const analyzeEmissionTrends = async () => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analyze this emission history and provide insights:
            ${JSON.stringify(emissionHistory)}
            
            Consider:
            1. Emission trends
            2. Most efficient modes used
            3. Potential optimizations
            4. Sustainable achievements`
        })
      });
      
      const data = await response.json();
      setAiAnalysis(data.response);
    } catch (err) {
      console.error('Failed to analyze trends');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-600">Smart Transport Analysis</h2>
        <TrendingUp className="text-indigo-500 w-6 h-6" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {transportModes.map((mode) => (
          <button
            key={mode.name}
            onClick={() => setSelectedMode(mode.name)}
            className={`flex items-center justify-center p-3 rounded-lg transition-all transform hover:scale-105 ${
              selectedMode === mode.name
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'
            }`}
          >
            <mode.icon className="w-5 h-5 mr-2" />
            {mode.name}
          </button>
        ))}
      </div>

      {selectedMode && (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance (km)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button
            onClick={getAIRecommendation}
            disabled={loading || !distance}
            className="w-full p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Get AI Analysis'
            )}
          </button>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {aiRecommendation && (
        <div className="bg-indigo-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-indigo-700">AI Recommendations:</h3>
          <p className="text-indigo-600 whitespace-pre-line">{aiRecommendation}</p>
        </div>
      )}

      {emissionHistory.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-indigo-700">Emission History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emissionHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  dot={{ fill: '#6366f1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {aiAnalysis && (
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-700 mb-2">AI Trend Analysis:</h3>
              <p className="text-indigo-600">{aiAnalysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransportModeAnalysis;