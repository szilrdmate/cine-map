import { useMediaQuery } from "react-responsive";

const MapControls = (map) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // Function to handle pitch change
  const toggle3DView = () => {
    const currentPitch = map.getPitch();
    map.easeTo({ pitch: currentPitch === 0 ? 60 : 0 });
  };
  // Function to handle bearing change
  const rotateMap = (direction) => {
    const bearing = map.getBearing();
    map.easeTo({
      bearing: bearing + (direction === "left" ? -10 : 10),
    });
  };

  return (
    isDesktop && (
      <>
        <button
          onClick={toggle3DView}
          className='toggle-3d absolute bottom-40 right-80 bg-white p-4 z-50'>
          Toggle 3D
        </button>
        <button
          onClick={() => rotateMap("left")}
          className='rotate-left absolute bottom-40 right-40 bg-white p-4 z-50'>
          Rotate Left
        </button>
        <button
          onClick={() => rotateMap("right")}
          className='rotate-right absolute bottom-40 right-10 bg-white p-4 z-50'>
          Rotate Right
        </button>
      </>
    ))
  }

export default MapControls;
