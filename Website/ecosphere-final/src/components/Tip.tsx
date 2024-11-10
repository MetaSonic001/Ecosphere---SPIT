interface TipProps {
  tip: {
    content: string;
    category: string;
  };
}

export default function Tip({ tip }: TipProps) {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
      <p className="text-green-700">{tip.content}</p>
      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
        {tip.category}
      </span>
    </div>
  );
}
