import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import '../assets/styles/form.css';

import Layout from '../components/Layout/Layout';


class App extends Component {
  

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;