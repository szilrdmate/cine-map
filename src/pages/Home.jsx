// src/pages/Home.jsx

import { useParams } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import Footer from '../components/Footer';

const Home = () => {
  const { city } = useParams();

  // Define a default city here
  const defaultCity = 'paris'; // Use a valid city name from your cityCoordinates
  const currentCity = city || defaultCity;

  return (
    <div>
      <MapComponent city={currentCity} />
      <Footer />
    </div>
  );
};

export default Home;


