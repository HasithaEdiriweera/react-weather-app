// import logo from "./logo.svg";
import "./App.css";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "tokyo" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-pink-600 to-blue-400";
    const threshold = units === "metric" ? 15 : 47;
    const threshold2 = units === "metric" ? 20 : 52;
    const threshold3 = units === "metric" ? 25 : 57;
    if (weather.temp <= threshold) return "from-pink-600 to-blue-400";
    else if (weather.temp <= threshold2) return "from-green-600 to-yellow-400";
    else if (weather.temp <= threshold3) return "from-pink-600 to-orange-400";

    return "from-yellow-700 to-orange-700";
  };
  return (
    <div
      className={`mx-auto max-w-screen-sm mt-4 py-5 px-12 bg-gradient-to-br h-fit ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
