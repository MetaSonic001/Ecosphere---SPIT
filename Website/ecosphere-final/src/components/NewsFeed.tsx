"use client";
import { useState, useEffect } from "react";
import { NewsItem, Tip } from "../app/types/index";

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, tipsRes] = await Promise.all([
          fetch("/api/news"),
          fetch("/api/tips"),
        ]);

        if (!newsRes.ok || !tipsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const newsData = await newsRes.json();
        const tipsData = await tipsRes.json();

        setNews(newsData);
        setTips(tipsData);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Sustainability News & Tips</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Latest News</h2>
          {news.length > 0 ? (
            news.map((item) => (
              <div
                key={item.id}
                className="mb-4 rounded-lg bg-white p-4 shadow"
              >
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{item.source}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No news items available.</p>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Related Tips</h2>
          {tips.length > 0 ? (
            tips.map((tip) => (
              <div
                key={tip.id}
                className="mb-4 rounded-lg bg-green-50 p-4 shadow"
              >
                <h3 className="text-xl font-medium">{tip.title}</h3>
                <p className="mt-2 text-gray-600">{tip.description}</p>
                <span className="mt-2 block text-sm text-gray-500">
                  Category: {tip.category}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tips available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
