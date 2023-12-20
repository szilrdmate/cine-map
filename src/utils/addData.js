import db from './fireBaseConfig'; // Import your Firestore instance
import movieData from "./movieLocations.json"

const addDataToFirestore = async () => {
    const moviesCollection = db.collection('movies');
  
    for (const movie of movieData) {
      try {
        await moviesCollection.add(movie);
        console.log(`Added movie: ${movie.title}`);
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  
    console.log("All data added to Firestore");
  };

addDataToFirestore();