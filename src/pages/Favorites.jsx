import FavoriteCards from "../components/FavoriteCards";

// TODO: Fix movie card cropping and sizing difference, and font, and padding on mobile view

const Favorites = () => {

    return (
        <div className="w-screen min-h-screen pb-10 md:pb-unset bg-teal-900 bg-opacity-60 backdrop-blur-[20px] z-50 absolute top-0 left-0">
            <FavoriteCards />
        </div>
    );
}
export default Favorites