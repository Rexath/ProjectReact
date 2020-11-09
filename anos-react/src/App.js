import React, { Component } from 'react';
import './App.css';

import RouterComponent from './component/RouterComponent.jsx';

class App extends Component {
  render() {
    return (
      <div  className="container">
        <RouterComponent/>
      </div>
    );
  }
}

export default App;
