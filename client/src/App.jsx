import React, { useState, Fragment } from 'react';
import './App.css'

// components of the web page:
import InputWeight from "./components/InputWeight";
import ListWeights from "./components/ListWeights";
import EditWeight from "./components/EditWeight";
import Averages from './components/Averages';

function App() {
  const today = new Date().toISOString().split('T')[0]; // Get today's date, and parses it into the desired format.
  const [count, setCount] = useState(0);

  return ( // This web page displays all of the necessary components of my GUI -- a place to enter your weight, a table to view/edit logs, and a table of the moving averages.
    <Fragment>
      <div className='container'> 
        <InputWeight /> 
        <ListWeights />
        <Averages />
      </div>     
    </Fragment>
  );
}

export default App;
