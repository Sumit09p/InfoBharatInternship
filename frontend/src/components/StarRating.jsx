import { Star } from "lucide-react";

export default function StarRating({ value = 0, onRate }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={22}
          className={`cursor-pointer transition ${
            i <= value ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
          onClick={() => onRate(i)}
        />
      ))}
    </div>
  );
}
