# CineMap

An interactive Map appliacation built for movie enthusiasts. Explore your favorite movie's location!

**Check out the live demo at:** https://cinemap.vercel.app

![Screenshot](/public/screenshot.png)

## Project Overview

CineMap is an exciting journey for movie lovers! Imagine exploring the real-world locations of your favorite films through an interactive map. Click on markers to uncover iconic movie spots, or add your own discoveries. Engage with fellow cinephiles by commenting on locations. Navigate effortlessly with options like quick links and a movie-centric search bar. Enjoy a sleek experience on any device, thanks to a responsive design and a switch between 2D and 3D views.

The project uses Mapbox GL JS, a powerful JavaScript library, to render interactive and customizable maps, enhancing the user experience. It utilizes GeoJSON, a widely accepted standard format for representing simple geographical features, to manage location data. This combination allows the application to effectively display movie locations on a dynamic map, offering users a visually engaging and interactive way to explore these spots.

## Key Elements

### _MapComponent:_

The MapComponent function is a React component that renders a map using the Mapbox GL library. It initializes the map, sets up event listeners, and handles city location changes. It also displays a movie card when a movie is selected and includes map controls for desktop screens.

#### Inputs

- No explicit inputs, but it relies on Redux state to obtain city location, selected movie, and map control timing.
- It also uses the useMediaQuery hook from the react-responsive library to detect desktop screen size.

#### Flow

1. The function initializes the map by creating a new mapboxgl.Map instance and setting its container, style, zoom, pitch, and center.
2. It adds event listeners to the map's "style.load" event, which triggers the handleStyleLoad function to set up the map's style and add markers for movie locations.
3. The function sets the isMapReady state to true when the map's style is loaded.
4. It includes a cleanup function to remove the map when the component is unmounted.
5. There is a separate useEffect hook to handle city location changes. It uses the type and coordinates from the Redux state to fly to the specified location on the map.

### _MovieCard:_

The MovieCard function is a React component that renders a movie card with various features such as a close button, favorite button, movie image, movie details, and a button to show the movie on a map. It also handles the logic for adding and removing movies from favorites and updating the Redux state and local storage accordingly.

#### Inputs

- **movie:** An object representing the movie data.
- **onClose:** A function to be called when the close button is clicked.

#### Flow

1. The function initializes state variables using the useState hook, including isClosing to track the closing animation, and localFavorites to store the favorite movies in local storage.
2. It uses the useDispatch and useSelector hooks from React Redux to access the Redux store and retrieve the favorites.
3. The function checks if the current movie is in the favorites list by comparing its title with the titles of the favorite movies.
4. The function defines a handleFavoriteClick function that is called when the favorite button is clicked. If the movie is already a favorite, it removes it from the local storage and Redux state. Otherwise, it adds the movie to the local storage and Redux state.
5. The function defines a handleClose function that is called when the close button is clicked. It sets the isClosing state variable to true and schedules the onClose function to be called after a delay of 500 milliseconds.
6. The function defines a handleShowOnMap function that is called when the "Show on Map" button is clicked. It extracts the longitude and latitude coordinates from the movie data and dispatches an action to update the Redux store with the coordinates.
7. The function checks if the movie object or its properties are invalid and returns null if so.
8. The function determines the animation class based on the isClosing state variable.
9. The function renders the movie card JSX with the appropriate CSS classes and event handlers.

### _useLocalStorage:_

This code defines a custom React hook called useLocalStorage that allows storing and retrieving data from the browser's local storage. It uses the useState and useEffect hooks from React to manage the state and perform side effects.

#### Inputs

- **key:** A string representing the key under which the data will be stored in the local storage.
- **initialValue:** The initial value to be used if there is no data stored under the specified key.

#### Flow

1. The function first checks if a key parameter is provided. If not, it throws an error indicating that the key must be provided.
2. It defines a helper function called readValueFromLocalStorage that attempts to read the value stored in the local storage under the specified key. If the value exists, it is parsed from JSON format. If there is an error reading the value, it logs a warning and returns the initialValue.
3. The function then calls the useState hook with the result of readValueFromLocalStorage as the initial state value. This creates a state variable called storedValue and a function called setStoredValue to update it.
4. The useEffect hook is used to perform a side effect whenever the key or storedValue changes. Inside the effect, it converts the storedValue to a JSON string and stores it in the local storage under the specified key.
5. Finally, the function returns an array containing the storedValue and setStoredValue functions, allowing the component using this hook to access and update the stored value

### _handleStyleLoad:_

The handleStyleLoad function is responsible for setting up the style and configuration of a map, loading a custom marker image, adding the image to the map if it doesn't already exist, adding a source and layers to the map if they don't already exist, and setting up event listeners for various map interactions.

#### Inputs

- **map:** The map object on which the style and configuration will be set, and the image, source, and layers will be added.
- **movieLocations:** The data representing movie locations.
- **dispatch:** The function used to dispatch actions in Redux.

#### Flow

1. Set various configuration properties for the map, such as the basemap, place labels, road labels, point of interest labels, and transit labels.
2. Check if the isHandleStyleLoadExecuted flag is true, and if so, return early.
3. Define the imageName variable as "custom-marker".
4. Load the custom marker image using the loadImage function, passing the map, image URL, and image name.
5. If the image is successfully loaded and not already added to the map, add it to the map.
6. Check if the isSourceAndLayersAdded flag is false, and if so, add the source and layers to the map using the addSourceAndLayers function.
7. Set up event listeners for clicking on clusters, clicking on individual markers, and hovering over clusters and individual markers.
8. Set the isHandleStyleLoadExecuted flag to true.

## Features

- [x] Interactive map
- [x] Clickable markers with corrseponding data
- [x] New marker creation and management
- [x] Commenting on posts
- [x] Navigating using quick links
- [x] Navigating with searchbar (ie. "city name")
- [x] Navigation based on movies
- [x] 2D/3D Toggle Switch
- [x] Custom map controls
- [x] Mobile/Desktop app UI
- [x] Customizeable map

## Technologies

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## Getting Started

### Prequisites

Before getting started, please ensure that you have the following third-party services set up:

- [MapBoxGLJS](https://mapbox.com/mapbox-gljs): Map
- [Firebase](https://www.firebase.google.com/): Backend
- [Firestore](https://firebase.google.com/firestore): Database

### Installation

To install the project and its dependencies, follow these steps:

1.  Clone the repository

```bash
git clone https://github.com/szilrdmate/cine-map.git
```

2.  Go to the project directory and install dependencies

```bash
cd cine-map
npm install
```

3.  Make a copy of the `.env.example` file:

```bash
cp .env.example .env
```

#### Open the `.env` file in a text editor and populate the values for the services mentioned above.

```bash
VITE_MAPBOX_ACCESS_TOKEN=
VITE_FIREBASE_API_KEY=
```

4.  Start the server

```bash
npm start
```

## Usage

- Coming soon
