import React, { useState, Fragment } from 'react';
import './App.css'

// components
import InputWeight from "./components/InputWeight";
import ListWeights from "./components/ListWeights";
import EditWeight from "./components/EditWeight";
import Averages from './components/Averages';

function App() {
  const today = new Date().toISOString().split('T')[0];
  const [count, setCount] = useState(0);

  return (
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
