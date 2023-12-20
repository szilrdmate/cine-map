import PropagateLoader from "react-spinners/PropagateLoader";
import { useEffect, useState } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true); // Start fade-out
      setTimeout(() => {
        setLoading(false); // Hide loader after fade-out completes
      }, 1000); // Match the duration of the fade-out animation
    }, 11000);
  }, []);

  return (
    <div>
      {loading && (
        <div className={`w-screen h-screen flex justify-center items-center bg-gray-300 ${fadeOut ? 'animate-fadeOut' : ''}`}>
          <PropagateLoader size={30} color={"#212121"} loading={!fadeOut} />
        </div>
      )}
    </div>
  );
};

export default Loading;
