import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Tokyo",
    },
    {
      id: 2,
      title: "Osaka",
    },
    {
      id: 3,
      title: "Kyoto",
    },
    {
      id: 4,
      title: "Hiroshima",
    },
    {
      id: 5,
      title: "Hokkaido",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-md font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
