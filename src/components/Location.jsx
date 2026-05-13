import React, { useState } from 'react'
import mapImg from '../assets/map.png';
const Location = () => {

  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pathPoints, setPathPoints] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("gate");

  // location data
  const locationData = {
    library: {
      path: "Gate -> Straight -> Left -> Reached",
      coords: [
        [10, 150],
        [80, 150],
        [80, 80]
      ]
    },

    block5: {
      path: "Gate -> Straight -> Left -> Reached",
      coords: [
        [10, 150],
        [120, 150],
        [120, 60]
      ]
    },
    nursing: {
      path: "Gate -> Straight -> right -> straight -> left -> reached ",
      coords: [
        [10, 150],
        [60, 150],
        [60, 200]
      ]
    },
  };

  const mapGraph = {
  gate: { x: 10, y: 150, neighbors: ["turn1"] },

  turn1: { x: 80, y: 150, neighbors: ["gate", "library", "block5"] },

  library: { x: 80, y: 80, neighbors: ["turn1"] },

  block5: { x: 120, y: 60, neighbors: ["turn1"] },

  nursing: { x: 60, y: 200, neighbors: ["gate"] }
};
const findPath = (start, end) => {
  let queue = [[start]];
  let visited = new Set();

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (node === end) return path;

    if (!visited.has(node)) {
      visited.add(node);

      mapGraph[node].neighbors.forEach((neighbor) => {
        queue.push([...path, neighbor]);
      });
    }
  }
};

const getCoordsFromPath = (path) => {
  return path.map((point) => [mapGraph[point].x, mapGraph[point].y]);
};

  const getLocationData = (e) => {
    const search = location.toLowerCase().trim();

    if (locationData[search]) {
      setResult(locationData[search].path); //sirf path
      setPathPoints(locationData[search].coords); // line bhi draw hogi
    } else {
      setResult("Location not Found 🙅‍♂️");
      setPathPoints([]); //clear line
    }
  };
const handleLocation = (place) => {
  const path = findPath(currentLocation, place);

  const coords = getCoordsFromPath(path);

  setPathPoints(coords);
  setResult(`Path: ${path.join(" → ")}`);
};
navigator.geolocation.getCurrentPosition((pos) => {
  console.log(pos.coords.latitude, pos.coords.longitude);
});

  return (
    <>

      <div className='flex justify-center flex-col items-center'>
        <h1 className=' text-4xl font-bold mt-10 underline'>AR-WayFinder</h1>
      </div>
      <div className='flex justify-center relative'>
        {/* input */}
        <input className='w-80 h-10 border m-10 text-center' type="text" placeholder='Enter Your Drop Location eg. Library'
          value={location} onChange={(e) => {
            const value = (e.target.value);
            setLocation(value);

            const filtered = Object.keys(locationData).filter((loc) =>
              loc.toLowerCase().includes(value.toLowerCase())
            )
            setSuggestions(value ? filtered : []);
          }} />

        {/* suggestions */}
        {suggestions.length > 0 && (
          <div className='absolute bg-gray-300 w-80 mr-17 mt-20 text-center rounded'>
            {suggestions.map((elem, idx) => (
              <p key={idx} className='px-4 py-2 cursor-pointer hover:bg-gray-600' onClick={() => {
                setLocation(elem);
                setSuggestions([]);
              }}>{elem}</p>
            ))}
          </div>
        )}
        {/* button */}
        <button onClick={getLocationData} className='font-bold border rounded active:scale-95 w-auto h-10 mt-10 p-2 bg-emerald-400 text-white'>Search</button>
      </div>

      {/* output */}
      {result && (
        <p className='text-center'>Path : {result}</p>
      )}


      {/* map */}
      <div className="relative w-fit mx-auto mt-20">

        <img src={mapImg} alt="map" className="w-80" />

        <svg className="absolute top-0 left-0 w-full h-full">
          <polyline
            points={pathPoints.map(p => p.join(",")).join(" ")}
            fill="none"
            stroke="blue"
            strokeWidth="4"
          />
        </svg>

        {/* Library point */}
        <button className='absolute top-20 left-20 bg-red-500 text-white px-2 py-1 rounded'
          onClick={() => handleLocation("library")}> 📍</button>

        {/* Block 5 */}
        <button className='absolute top-20 left-20 bg-blue-500 text-white px-2 py-1 rounded'
          onClick={() => handleLocation("block5")}> 📍</button>

        {/* nursing */}
        <button className='absolute top-20 left-40 bg-green-500 text-white px-2 py-1 rounded'
          onClick={() => handleLocation("nursing")}> 📍</button>

      </div>
    </>
  )
}

export default Location
