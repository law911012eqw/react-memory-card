import React, {useState, useEffect} from 'react'

import Scores from './Components/Scores';
import Header from './Components/Header';
import Main from './Components/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;