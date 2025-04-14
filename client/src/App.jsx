import React, { useState, Fragment } from 'react';
import './App.css'

// components
import InputWeight from "./components/InputWeight";

function App() {
  const today = new Date().toISOString().split('T')[0];
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <div className='container'> 
        <InputWeight /> 
      </div>     
    </Fragment>
  );
}

export default App;
