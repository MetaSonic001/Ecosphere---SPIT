"use client";

import { useState, useEffect } from "react";
import NewsArticle from "./NewsArticle";
import Tip from "./Tip";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  source: string;
  category: string;
}

interface Tip {
  id: string;
  content: string;
  category: string;
}

export default function SustainabilityFeed() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("Failed to load sustainability feed. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSustainabilityFeed();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
        {newsArticles.map((article) => (
          <NewsArticle key={article.id} article={article} />
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Sustainability Tips</h2>
        {tips.map((tip) => (
          <Tip key={tip.id} tip={tip} />
        ))}
      </div>
    </div>
  );
}
