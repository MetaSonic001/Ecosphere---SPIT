"use client";
import React, { useState, useEffect } from "react";
import {
  Newspaper,
  Clock,
  ArrowUpRight,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Comprehensive static news database
const staticNews = [
  {
    id: 1,
    category: "Climate Action",
    title: "Major Cities Pledge to Reach Net-Zero Emissions by 2040",
    summary:
      "Over 100 major cities worldwide have committed to achieving net-zero emissions a decade ahead of national targets, setting ambitious goals for sustainable urban development.",
    date: "2024-03-15",
    readTime: "5 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["cities", "emissions", "policy"],
  },
  {
    id: 2,
    category: "Innovation",
    title: "Breakthrough in Carbon Capture Technology Shows Promise",
    summary:
      "Scientists develop new membrane technology that can capture CO2 from the air with 90% greater efficiency than current methods, potentially revolutionizing climate change mitigation efforts.",
    date: "2024-03-14",
    readTime: "4 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["technology", "carbon-capture", "research"],
  },
  {
    id: 3,
    category: "Renewable Energy",
    title: "Solar Power Achieves New Price Record in Global Markets",
    summary:
      "Latest solar installations set record-low prices for electricity generation, making renewable energy more accessible than ever and accelerating the transition from fossil fuels.",
    date: "2024-03-13",
    readTime: "6 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["solar", "energy", "markets"],
  },
  {
    id: 4,
    category: "Conservation",
    title: "Global Reforestation Initiative Exceeds Annual Target",
    summary:
      "International conservation efforts plant over 1 billion trees in 2024, surpassing yearly goals and creating new carbon sinks across multiple continents.",
    date: "2024-03-12",
    readTime: "3 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["forests", "biodiversity", "conservation"],
  },
  {
    id: 5,
    category: "Sustainable Living",
    title: "Zero-Waste Lifestyle Movement Gains Global Momentum",
    summary:
      "Growing number of households worldwide adopt zero-waste practices, significantly reducing plastic consumption and landfill waste through innovative lifestyle changes.",
    date: "2024-03-11",
    readTime: "4 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["lifestyle", "waste-reduction", "sustainability"],
  },
  {
    id: 6,
    category: "Transportation",
    title: "Electric Vehicle Sales Surpass Traditional Cars in Major Markets",
    summary:
      "Electric vehicle adoption reaches historic milestone as sales exceed conventional vehicles in several key markets, marking a turning point in sustainable transportation.",
    date: "2024-03-10",
    readTime: "5 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["ev", "transport", "market-trends"],
  },
  {
    id: 7,
    category: "Policy",
    title: "New Carbon Tax Framework Receives International Support",
    summary:
      "Global coalition of nations agrees to standardized carbon pricing mechanism, creating unified approach to emissions reduction and climate action.",
    date: "2024-03-09",
    readTime: "7 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["policy", "carbon-tax", "international"],
  },
  {
    id: 8,
    category: "Agriculture",
    title: "Sustainable Farming Practices Reduce Agricultural Emissions",
    summary:
      "Implementation of regenerative agriculture techniques shows significant reduction in carbon emissions while improving soil health and crop yields.",
    date: "2024-03-08",
    readTime: "4 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["agriculture", "farming", "emissions"],
  },
  {
    id: 9,
    category: "Innovation",
    title: "AI-Powered Smart Grids Optimize Renewable Energy Distribution",
    summary:
      "Artificial intelligence technology revolutionizes power grid management, maximizing renewable energy efficiency and reducing waste in electricity distribution.",
    date: "2024-03-07",
    readTime: "5 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["AI", "smart-grid", "energy"],
  },
  {
    id: 10,
    category: "Marine Conservation",
    title: "Ocean Cleanup Project Removes Record Amount of Plastic",
    summary:
      "Innovative ocean cleaning technology successfully removes millions of tons of plastic waste, marking major breakthrough in marine ecosystem protection.",
    date: "2024-03-06",
    readTime: "4 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["ocean", "plastic", "conservation"],
  },
  {
    id: 11,
    category: "Green Building",
    title: "Sustainable Architecture Reshapes Urban Development",
    summary:
      "New sustainable building standards lead to significant reduction in urban carbon footprints while improving quality of life for residents.",
    date: "2024-03-05",
    readTime: "6 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["architecture", "urban-planning", "sustainability"],
  },
  {
    id: 12,
    category: "Education",
    title: "Climate Education Becomes Mandatory in School Curricula",
    summary:
      "Growing number of countries integrate comprehensive climate science and sustainability education into national school programs.",
    date: "2024-03-04",
    readTime: "3 min",
    imageUrl: "/api/placeholder/800/400",
    tags: ["education", "climate", "policy"],
  },
];

const categories = [...new Set(staticNews.map((news) => news.category))];

const EcoNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Attempt to fetch from API
      const response = await fetch("/api/eco-news");
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      // Fallback to static news
      console.log("Using static news fallback");
      setNews(staticNews);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews =
    selectedCategory === "All"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-600">Eco News Feed</h2>
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {selectedCategory}
            <ChevronDown className="w-4 h-4" />
          </button>

          {showCategoryDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
              <div className="py-1">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setShowCategoryDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-green-50 text-sm"
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-green-50 text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    {item.readTime}
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 leading-tight">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.summary}
                </p>

                <div className="pt-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium">
                    Read more
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default EcoNewsFeed;
