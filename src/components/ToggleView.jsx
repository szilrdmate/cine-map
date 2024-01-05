// src/unused/ToggleView.jsx

import { useMediaQuery } from "react-responsive";

const ToggleView = () => {
  // Media query to detect desktop screen size
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // Function to toggle between 2D and 3D views
  const toggleView = ({ map }) => {
    if (map.current.getPitch() === 0) {
      console.log("Pitch to 60");
      map.current.easeTo({ pitch: 60, bearing: 0 });
    } else {
      console.log("Pitch to 0");
      map.current.easeTo({ pitch: 0, bearing: 0 });
    }
  };

  return (
    isDesktop && (
      <button
        onClick={toggleView}
        className='absolute z-[19] top-28 right-6 bg-white rounded-lg px-4 py-2 shadow-xl border-[1px] border-solid border-gray-400 font-bold'>
        2D / 3D
      </button>
    )
  );
};

export default ToggleView;
