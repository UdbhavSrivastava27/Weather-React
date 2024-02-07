import { useEffect, useState } from "react";
import "./App.css";
import Forecaste from "./Forecaste";
import Inputs from "./Inputs";
import TempAndDetails from "./TempAnd Details";
import TimeAndLocation from "./TimeAndLocation";
import TopButton from "./TopButton";
import getFormattedWeatherData from "./weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "./Constants/bg.png";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  console.log(weather)

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
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-900 to-blue-400";

    return "from-yellow-400 to-orange-900";
  };

  return (
    <div className=" bg-gradient-to-br from-slate-700 to-cyan-300 h-full md:h-screen  flex flex-col lg:flex-row items-center p-10">
      <div
        className={`mx-auto max-w-screen-md py-5 px-2 md:px-28 lg:px-32 bg-gradient-to-br mt-6 rounded-md h-fit shadow-xl shadow-gray-700 ${formatBackground()} relative  opacity-90`}
      >
        <TopButton setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TempAndDetails weather={weather} />

            <Forecaste title="hourly forecast" items={weather.hourly} />
            <Forecaste title="daily forecast" items={weather.daily} />
          </div>
        )}

        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
                 
       
           

      </div>

      <div className=" items-center justify-center ">
        <a
          href="https://www.msn.com/en-us/weather/maps/temperature/in-Allahabad,Uttar-Pradesh?loc=eyJsIjoiQWxsYWhhYmFkIiwiciI6IlV0dGFyIFByYWRlc2giLCJjIjoiSW5kaWEiLCJpIjoiSU4iLCJ0IjoxMDIsImciOiJlbi11cyIsIngiOiI4MS44NTQ1OTg5OTkwMjM0NCIsInkiOiIyNS40MjkxMDAwMzY2MjEwOTQifQ%3D%3D&weadegreetype=C&ocid=winp2fptaskbar&cvid=bf5a33e9aad3421cb5bed24e398fa934&zoom=3&3d=1&night=1"
          target="_blank"
        >
          <div className=" flex flex-col mt-20 md:mt-6">
            
            <img
              src={bg}
              className=" mx-auto lg:mr-14  md:h-[486px]   w-auto  border-8 rounded-md border-gray-700  shadow-xl shadow-gray-700
      "
            ></img>
            <h1 className=" absolute text-center ml-1  md:mr-14 bg-gray-700 text-slate-100 p-3 rounded-b-md  font-semibold  ">
              View in 3D
            </h1>
          </div>
        </a>
      </div>

    </div>
  );
}

export default App;
