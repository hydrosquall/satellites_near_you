import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import withLocation from './components/withLocation';

class App extends Component {
  render() {
    const { location } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            {location.latitude}
            {location.longitude}
          </p>

        </header>
      </div>
    );
  }
}

export default withLocation(App);
