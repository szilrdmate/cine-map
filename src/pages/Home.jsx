// src/pages/Home.jsx

import { useParams } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  const { city } = useParams();
  const isDesktop = useMediaQuery( {query: '(min-width: 768px)'} );

  const defaultCity = 'paris';
  const currentCity = city || defaultCity;

  return (
    <div>
      <MapComponent city={currentCity} />
      {isDesktop && (<Footer />)}
    </div>
  );
};

export default Home;


