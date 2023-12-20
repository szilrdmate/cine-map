// src/utils/addData.js
import db from './fireBaseConfig.js';
import { collection, doc, setDoc } from 'firebase/firestore';


const movieData = [

  ]

  const addMoviesToFirestore = async () => {
    try {
      for (const movie of movieData) {
        const docRef = doc(collection(db, 'movies'), movie.title);
        await setDoc(docRef, movie);
        console.log(`Added movie: ${movie.title}`);
      }
      console.log('All movies added to Firestore');
    } catch (error) {
      console.error('Error adding movies to Firestore:', error);
    }
  };
  
  addMoviesToFirestore();
