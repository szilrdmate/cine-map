/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const DesktopNav = ({
  searchQuery,
  handleSearchInputChange,
  handleSearchSubmit,
  isDropdownOpen,
  setIsDropdownOpen,
  handleExploreLinkClick,
  cityCoordinates,
}) => {
    const dropdownIcon = isDropdownOpen ? faCaretUp : faCaretDown;

  return (
    <div id="desktop-nav" className='bg-white shadow-2xl rounded-3xl absolute z-20 w-full h-24'>
      <div className='px-8 w-full h-full flex justify-between items-center'>
        <div className='flex space-x-7'>
          <Link to='/' className='flex items-center'>
            <img src='/logo.svg' alt='Logo' className='h-10 w-auto' />
          </Link>
        </div>

        <div className='hidden md:flex items-center lg:space-x-8 space-x-2'>
          <Link
            to='/'
            className='lg:text-2xl text-xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300'>
            Map
          </Link>

          {/* Explore Dropdown */}
          <div className='relative flex items-center'>
            <button
              className='lg:text-2xl text-xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300'
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}>
              Explore{" "}
              <FontAwesomeIcon icon={dropdownIcon} className="text-gray-800 text-md ml-1" />
            </button>
            {isDropdownOpen && (
              <div
                className='absolute top-8 w-full shadow-xl bg-white rounded-md py-1'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}>
                {/* Pass city coordinates to the handleExploreLinkClick function */}
                <Link
                  to='/paris'
                  className='block py-2 px-4 text-sm hover:bg-gray-200'
                  onClick={() => handleExploreLinkClick(cityCoordinates.paris)}>
                  Paris
                </Link>
                <Link
                  to='/london'
                  className='block py-2 px-4 text-sm hover:bg-gray-200'
                  onClick={() =>
                    handleExploreLinkClick(cityCoordinates.london)
                  }>
                  London
                </Link>
                <Link
                  to='/budapest'
                  className='block py-2 px-4 text-sm hover:bg-gray-200'
                  onClick={() =>
                    handleExploreLinkClick(cityCoordinates.budapest)
                  }>
                  Budapest
                </Link>
                <Link
                  to='/newyork'
                  className='block py-2 px-4 text-sm hover:bg-gray-200'
                  onClick={() =>
                    handleExploreLinkClick(cityCoordinates.newyork)
                  }>
                  New York
                </Link>
              </div>
            )}
          </div>

          <Link
            to='/favorites'
            className='lg:text-2xl text-xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300'>
            Favorites
          </Link>
        </div>

        {/* Searchbar */}
        <div className='hidden md:flex items-center'>
          <form onSubmit={handleSearchSubmit}>
            <input
              className='placeholder:italic placeholder:font-medium py-2 px-6 font-semibold text-gray-900 rounded-full transition duration-300 border-2 border-solid border-teal-950 focus:outline-none active:outline-none'
              type='search'
              name='searchbar'
              id='searchbar'
              autoComplete="off"
              placeholder="Search other cities..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button
              className='h-[44px] w-[44px] absolute right-8 bg-transparent py-2 px-2 rounded-full text-teal-950 text-lg'
              type='submit'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
