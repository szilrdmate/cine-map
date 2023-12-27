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
    <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto relative top-40 pb-10">
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
