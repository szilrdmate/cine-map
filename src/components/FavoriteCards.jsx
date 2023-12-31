import { useSelector } from 'react-redux';
import FavoriteItem from './FavoriteItem';
import FavoriteSkeleton from './FavoriteSkeleton';

const FavoriteCards = () => {
  const favorites = useSelector(state => state.city.favorites);

  const renderSkeletons = (count) => {
    return Array.from({ length: count }, (_, index) => <FavoriteSkeleton key={index} />);
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16 md:gap-4 max-w-6xl px-4 mx-auto pt-40 pb-20">
      {favorites && favorites.length > 0 ? (
        favorites.map(favorite => (
          // Assuming each favorite has a unique title
          <FavoriteItem key={favorite.properties.title} favorite={favorite} />
        ))
      ) : (
        renderSkeletons(3)
      )}
    </div>
  );
};

export default FavoriteCards;
