import React from 'react';
import logo from './logo.svg';
import './App.scss';
import List from './components/List';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <List />
    </div>
  );
}

export default App;
