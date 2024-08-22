import React, { useState } from 'react';
import MapComponent from './MapComponent';
import Controls from './Controls';

const App = () => {
  const [mapProps, setMapProps] = useState({
    startCoords: [22.1696, 91.4996],
    endCoords: [22.2637, 91.7159],
    speed: 100,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if(!isPlaying) {
      setIsPlaying(true);
    }
    else {
      setMapProps({
        startCoords: mapProps.startCoords,
        endCoords: mapProps.endCoords,
        speed: mapProps.speed,
      });
      setIsPlaying(true);
    }
  };
  const handlePause = () => setIsPlaying(false);

  const handleUpdate = (props) => {
    setMapProps(props);
    // Resetting isPlaying to false to stop the animation
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col py-5 md:h-[screen] h-[120vh]">
      <div className="grid grid-cols-4 h-full">
        <div className="md:col-span-1 h-[50vh]  col-span-4 md:p-4 p-1">
          <Controls
            onPlay={handlePlay}
            onPause={handlePause}
            onUpdate={handleUpdate}
          />
        </div>
        <div className="col-span-4 h-[70vh] md:h-full md:col-span-3 md:p-4 p-1">
          <MapComponent
          key={JSON.stringify(mapProps)} // Key based on mapProps to force remount
            startCoords={mapProps.startCoords}
            endCoords={mapProps.endCoords}
            speed={mapProps.speed}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
