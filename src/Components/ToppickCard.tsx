import React from "react";

interface ToppickCardProps {
  img: string;
  name: string;
  price: number;
  onViewDetails: () => void;
}

const ToppickCard: React.FC<ToppickCardProps> = ({
  img,
  name,
  price,
  onViewDetails,
}) => {
  return (
    <div className="border p-4 rounded shadow max-w-xs cursor-pointer flex flex-col">
      <img
        src={img}
        alt={name}
        className="w-full h-80 object-contain rounded bg-white" // updated height
        onClick={onViewDetails}
      />
      <h3 className="mt-4 font-semibold text-lg">{name}</h3>
      <p className="text-primary font-bold mt-2">Rs {price}</p>
      <button
        onClick={onViewDetails}
        className="mt-4 px-4 py-2 bg-[#7a1e2c] text-white rounded hover:bg-[#5c1621] transition"
      >
        View Details
      </button>
    </div>
  );
};

export default ToppickCard;
