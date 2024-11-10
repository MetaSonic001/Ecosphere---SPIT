"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Leaf, Newspaper } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Static fallback data
const staticNewsArticles = [
  {
    id: "1",
    title:
      "Solar Power Breakthrough: New Technology Increases Efficiency by 40%",
    description:
      "Scientists have developed a new solar panel coating that significantly improves energy capture efficiency.",
    publishedAt: "2024-03-15",
    source: "Green Tech Weekly",
    category: "renewable-energy",
  },
  {
    id: "2",
    title: "Major Cities Pledge to Achieve Net-Zero Emissions by 2040",
    description:
      "A coalition of 50 major cities worldwide has committed to ambitious climate goals.",
    publishedAt: "2024-03-14",
    source: "Climate Action News",
    category: "policy",
  },
  {
    id: "3",
    title: "Ocean Cleanup Project Removes 100,000 kg of Plastic",
    description:
      "Innovative ocean cleanup technology achieves major milestone in plastic waste removal.",
    publishedAt: "2024-03-13",
    source: "Marine Conservation Today",
    category: "oceans",
  },
];

const staticTips = [
  {
    id: "1",
    content:
      "Replace single-use items with reusable alternatives like water bottles and shopping bags.",
    category: "waste-reduction",
  },
  {
    id: "2",
    content:
      "Start a home composting system to reduce food waste and create nutrient-rich soil.",
    category: "composting",
  },
  {
    id: "3",
    content:
      "Use cold water for laundry when possible - it saves energy and is often better for clothes.",
    category: "energy-savings",
  },
];

const NewsArticle = ({ article }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
      <div className="text-sm text-gray-500">
        {new Date(article.publishedAt).toLocaleDateString()} • {article.source}
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription>{article.description}</CardDescription>
    </CardContent>
  </Card>
);

const Tip = ({ tip }) => (
  <Card className="mb-4 bg-green-50">
    <CardContent className="pt-4">
      <div className="flex items-start space-x-2">
        <Leaf className="h-5 w-5 text-green-600 mt-1" />
        <p className="text-gray-700">{tip.content}</p>
      </div>
    </CardContent>
  </Card>
);

export default function SustainabilityFeed() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSustainabilityFeed() {
      try {
        const response = await fetch("/api/sustainability-feed");
        if (!response.ok) {
          throw new Error("Failed to fetch sustainability feed");
        }
        const data = await response.json();
        setNewsArticles(data.newsArticles);
        setTips(data.tips);
      } catch (error) {
        console.error("Falling back to static content:", error);
        setNewsArticles(staticNewsArticles);
        setTips(staticTips);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSustainabilityFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Newspaper className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Latest Sustainability News</h2>
        </div>
        {newsArticles.map((article) => (
          <NewsArticle key={article.id} article={article} />
        ))}
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Leaf className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Eco-Friendly Tips</h2>
        </div>
        {tips.map((tip) => (
          <Tip key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  );
}
