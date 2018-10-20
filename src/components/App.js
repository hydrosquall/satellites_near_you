import React, { Component } from 'react';

import withLocation from './withLocation';
import withEnigmaTable from './withEnigmaTable';

class App extends Component {

  componentDidMount() {

  }


  render() {
    const { location, enigmaTable } = this.props;

    console.log(enigmaTable);

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

export default withEnigmaTable(withLocation(App));
