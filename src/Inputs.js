import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

import { IoLocationOutline } from "react-icons/io5";

const Inputs = ({setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  return (
    <div className=" fexl flex-row my-6  justify-center">
      <div className=" flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search Your City..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize rounded-md "
        />
        <BsSearch
          className="text-white text-5xl "
          onClick={handleSearchClick}
        />
        <IoLocationOutline
          className=" text-white text-5xl"
          onClick={handleLocationClick}
        />
   
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
    </div>
  );
};

export default Inputs;
