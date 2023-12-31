import FavoriteCards from "../components/FavoriteCards";

// TODO: FIx movie card cropping and sizeing difference, and font, and padding on mobile view

const Favorites = () => {

    return (
        <div className="w-screen min-h-screen bg-teal-900 z-10 absolute top-0 left-0">
            <FavoriteCards />
        </div>
    );
}
export default Favorites