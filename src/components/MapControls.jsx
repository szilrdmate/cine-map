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
      <div className="shadow-2xl absolute bottom-40 right-6 z-40 grid grid-rows-2 grid-cols-3 overflow-hidden rounded-2xl">
        <button onClick={handleToggle3DView} className=" bg-white w-12 h-12 z-50 border-gray-200 border-[1px] row-start-2 row-span-1 rounded-l-2xl col-span-1 col-start-1 ">
          <FontAwesomeIcon className="text-xl" icon={faCube} />
        </button>
        <button onClick={handleRotateMapLeft} className="rounded-tl-2xl bg-white w-12 h-12 border-gray-200 border-[1px] row-start-1 row-span-1 col-span-1 col-start-2">
          <FontAwesomeIcon className="text-xl" icon={faRotateRight} />
        </button>
        <button onClick={handleRotateMapRight} className=" bg-white w-12 h-12 border-gray-200 border-[1px] row-start-1 row-span-1 col-span-1 col-start-3">
          <FontAwesomeIcon className="text-xl" icon={faRotateLeft} />
        </button>
        <button onClick={handleZoomOut} className=" bg-white w-12 h-12 border-gray-200 border-[1px] row-start-2 row-span-1 col-span-1 col-start-2">
          <FontAwesomeIcon className="text-xl" icon={faMagnifyingGlassMinus} />
        </button>
        <button onClick={handleZoomIn} className="bg-white w-12 h-12 border-gray-200 border-[1px] row-start-2 row-span-1 col-span-1 col-start-3">
          <FontAwesomeIcon className="text-xl" icon={faMagnifyingGlassPlus} />
        </button>
      </div>
    )
  );
};

export default MapControls;