import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface NewsArticleProps {
  article: {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
    publishedAt: string;
    source: string;
    category: string;
  };
}

export default function NewsArticle({ article }: NewsArticleProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      {article.imageUrl && (
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {article.title}
          </a>
        </h3>
        <p className="text-gray-600 mb-2">{article.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{article.source}</span>
          <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
        </div>
        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
          {article.category}
        </span>
      </div>
    </div>
  );
}
