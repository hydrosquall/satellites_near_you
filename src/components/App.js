import React, { Component } from 'react';
import { compose } from "recompose";

import withLocation from './withLocation';
import withEnigmaTable from './withEnigmaTable';
import withSatellites from './withSatellites';

class App extends Component {

  componentDidMount() {

  }

  render() {
    const { location, enigmaTable, satellites } = this.props;
    console.log('We need you here', satellites);

    return (
      <div className="App">
          <p>
            Current Location: {location.latitude}, {location.longitude}
          </p>
          <ul>
            {
              enigmaTable.map(row => {
              return (<li>{row.type_of_orbit}</li>)
              })
            }
          </ul>
      </div>
    );
  }
}

export default compose(
  withSatellites,
  withLocation,
  withEnigmaTable,
)(App);
