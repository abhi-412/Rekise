import React, { useState } from 'react';

const Controls = ({ onUpdate, onPlay, onPause }) => {
  const [startLat, setStartLat] = useState(22.1696);
  const [startLng, setStartLng] = useState(91.4996);
  const [endLat, setEndLat] = useState(22.2637);
  const [endLng, setEndLng] = useState(91.7159);
  const [speed, setSpeed] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      startCoords: [parseFloat(startLat), parseFloat(startLng)],
      endCoords: [parseFloat(endLat), parseFloat(endLng)],
      speed: parseFloat(speed),
    });
  };

  return (
    <div className="p-4 w-full bg-gray-100 shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">Navigation Controls</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='flex md:flex-col flex-row gap-3'>
        <div>
          <label className="block text-sm font-medium mb-1">Start Latitude</label>
          <input
            type="number"
            step="any"
            value={startLat}
            onChange={(e) => setStartLat(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Longitude</label>
          <input
            type="number"
            step="any"
            value={startLng}
            onChange={(e) => setStartLng(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        </div>
        <div className='flex md:flex-col flex-row gap-3'>
        <div>
          <label className="block text-sm font-medium mb-1">End Latitude</label>
          <input
            type="number"
            step="any"
            value={endLat}
            onChange={(e) => setEndLat(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Longitude</label>
          <input
            type="number"
            step="any"
            value={endLng}
            onChange={(e) => setEndLng(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Speed (km/h)</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
       
      </form>
      <div className="mt-4">
          <button
            type="button"
            onClick={onPlay}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Start
          </button>
          <button
            type="button"
            onClick={onPause}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Pause
          </button>
        </div>
    </div>
  );
};

export default Controls;
