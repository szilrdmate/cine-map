/* eslint-disable react/prop-types */
// src/pages/Home.jsx
import MapComponent from '../components/MapComponent';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  const isDesktop = useMediaQuery( {query: '(min-width: 768px)'} );

  return (
    <>
      <MapComponent />
      {isDesktop && (<Footer />)}
    </>
  );
};

export default Home;


