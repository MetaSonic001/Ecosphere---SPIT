'use client'

import { useState } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const AISustainabilityAdvisor = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAIAdvice = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: `As a sustainable travel advisor, provide eco-friendly advice for: ${query}`,
        })
      });
      
      const data = await result.json();
      setResponse(data.response);
    } catch (err) {
      setError('Failed to get AI advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">AI Travel Sustainability Advisor</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about sustainable travel options..."
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
            <p className="text-purple-800">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISustainabilityAdvisor;