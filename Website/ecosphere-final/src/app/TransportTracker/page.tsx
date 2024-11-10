import AISustainabilityAdvisor from "./components/AIAdvisor";
import CarbonOffsetOptions from "./components/CarbonOffsetOptions";
import EcoFriendlyTravelGuides from "./components/EcoFriendlyTravelGuides";
import SustainableTravelSuggestions from "./components/SustainableTravelSuggestions";
import TransportModeAnalysis from "./components/TransportAnalysis";
import TravelWithPurpose from "./components/TravelWithPurpose";

// Update page.tsx layout
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Sustainable Travel Companion
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Eco-friendly Travel Planning
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AISustainabilityAdvisor />
          <TransportModeAnalysis />
          <CarbonOffsetOptions />
          <EcoFriendlyTravelGuides />
          <SustainableTravelSuggestions />
          <TravelWithPurpose />
        </div>
      </div>
    </div>
  );
}