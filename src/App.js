import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchRestaurants } from './utils';
import Restaurants from './Restaurants';

function App() {
  const [restaurants, setRestaurants] = useState(null)
  useEffect(()=>{
    fetchRestaurants()
      .then(setRestaurants)
      .catch(()=>console.log("error in fetching"))
  }, [])

  return (
    <Restaurants list={restaurants}/>
  );
}

export default App;
