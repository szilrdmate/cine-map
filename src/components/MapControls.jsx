/* eslint-disable react/prop-types */
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faRotateLeft, faCube, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons"

const MapControls = ({ map }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const toggle3DView = () => {
    const currentPitch = map.getPitch();
    map.easeTo({ pitch: currentPitch === 0 ? 60 : 0 });
  };

  const rotateMap = (direction) => {
    const bearing = map.getBearing();
    map.easeTo({ bearing: bearing + (direction === 'right' ? -20 : 20) });
  };

  const handleZoom = (dir) => {
    const zoom = map.getZoom();
    map.easeTo({ zoom: zoom + (dir === 'out' ? -0.5 : 0.5) });
  };

  const handleToggle3DView = () => {
    toggle3DView();
  };

  const handleRotateMapLeft = () => {
    rotateMap('left');
  };

  const handleRotateMapRight = () => {
    rotateMap('right');
  };

  const handleZoomOut = () => {
    handleZoom('out');
  };

  const handleZoomIn = () => {
    handleZoom('in');
  };

  return (
    isDesktop && (
      <div className="shadow-2xl absolute bottom-40 border-gray-200 border-[1px] right-6 z-40 grid grid-rows-2 grid-cols-2 overflow-hidden rounded-3xl">
        <button onClick={handleRotateMapLeft} className="rounded-tl-2xl bg-white w-12 h-12 border-gray-200 border-[1px] row-start-1 row-span-1 col-span-1 col-start-1">
          <FontAwesomeIcon className="text-lg text-gray-900" icon={faRotateRight} />
        </button>
        <button onClick={handleRotateMapRight} className=" bg-white w-12 h-12 border-gray-200 border-[1px] row-start-1 row-span-1 col-span-1 col-start-2">
          <FontAwesomeIcon className="text-lg text-gray-900" icon={faRotateLeft} />
        </button>
        <button onClick={handleZoomOut} className=" bg-white w-12 h-12 border-gray-200 border-[1px] row-start-2 row-span-1 col-span-1 col-start-1">
          <FontAwesomeIcon className="text-lg text-gray-900" icon={faMagnifyingGlassMinus} />
        </button>
        <button onClick={handleZoomIn} className="bg-white w-12 h-12 border-gray-200 border-[1px] row-start-2 row-span-1 col-span-1 col-start-2">
          <FontAwesomeIcon className="text-lg text-gray-900" icon={faMagnifyingGlassPlus} />
        </button>
        <button onClick={handleToggle3DView} className="absolute left-7 top-7 rounded-full bg-white w-10 h-10 border-gray-200 border-[1px]">
          <FontAwesomeIcon className="text-lg text-gray-900" icon={faCube} />
        </button>
      </div>
    )
  );
};

export default MapControls;