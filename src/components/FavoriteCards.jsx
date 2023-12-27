// src/components/FavoiteCards.jsx
import { useSelector } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import FavoriteSkeleton from './FavoriteSkeleton';

const FavoriteCards = () => {
  const favorites = useSelector(state => state.city.favorites);

  // Function to generate skeleton components
  const renderSkeletons = (count) => {
    return Array.from({ length: count }, (_, index) => <FavoriteSkeleton key={index} />);
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 md:gap-4 max-w-6xl px-4 mx-auto relative top-32 md:top-40 pb-28 md:pb-10">
      {favorites && favorites.length > 0 ? (
        favorites.map((favorite, index) => (
          <FavoriteItem key={index} favorite={favorite} />
        ))
      ) : (
        renderSkeletons(3) // Render 3 skeleton components
      )}
    </div>
  );
};

export default FavoriteCards;
