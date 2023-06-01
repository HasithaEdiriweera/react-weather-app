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
    <div className="flex flex-wrap justify-center my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-md font-medium mx-2 my-2 px-4 py-2 rounded-lg"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
