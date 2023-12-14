import React from 'react';
import { useParams } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import Footer from '../components/Footer';

const Home = () => {
  let { city } = useParams();

  // If no city is specified in the URL, default to Paris
  const cityToRender = city || "paris";

  return (
    <div>
      <MapComponent city={cityToRender} />
        <Footer />
    </div>
  );
};

export default Home;
