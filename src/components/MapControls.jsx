import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faRotateLeft, faCube, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons"

const MapControls = (map) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // Functio to toggle between  2D and 3D
  const toggle3DView = () => {
    const currentPitch = map.getPitch();
    map.easeTo({pitch: currentPitch === 0 ? 60 : 0});
};

// Functon to handle bearing change on map
const rotateMap = (direction) => {
    const bearing = map.getBearing();
    map.easeTo({ bearing: bearing + (direction === 'right' ? -20 : 20) });
}

// Functon to handle pitch change on map
const handleZoom = (dir) => {
  const zoom = map.getZoom();
  map.easeTo({ zoom: zoom + (dir === 'out' ? -0.5 : 0.5) });
} 
  return (
    isDesktop && (
      <>
        <div className="absolute bottom-40 right-6  z-50 grid grid-rows-2 grid-cols-3 overflow-hidden rounded-2xl">
          <button onClick={toggle3DView} className=" bg-white w-12 h-12 z-50 border-gray-200 border-[1px] row-start-2 row-span-1 rounded-l-2xl col-span-1 col-start-1 "><FontAwesomeIcon className="text-xl" icon={faCube} /></button>
          <button onClick={() => rotateMap('left')} className="rounded-tl-2xl bg-white w-12 h-12 border-gray-200 border-[1px] row-start-1 row-span-1 col-span-1 col-start-2"><FontAwesomeIcon className="text-xl" icon={faRotateRight} /></button>
          <button onClick={() => rotateMap('right')} className=" bg-white w-12 h-12 border-gray-200 border-[1px] row-start-1 row-span-1 col-span-1 col-start-3"><FontAwesomeIcon className="text-xl" icon={faRotateLeft} /></button>
          <button onClick={() => handleZoom('out')} className=" bg-white w-12 h-12 border-gray-200 border-[1px] row-start-2 row-span-1 col-span-1 col-start-2"><FontAwesomeIcon className="text-xl" icon={faMagnifyingGlassMinus} /></button>
          <button onClick={() => handleZoom('in')} className="bg-white w-12 h-12 border-gray-200 border-[1px] row-start-2 row-span-1 col-span-1 col-start-3"><FontAwesomeIcon className="text-xl" icon={faMagnifyingGlassPlus} /></button>
        </div>
      </>
    ))
  }

export default MapControls;
