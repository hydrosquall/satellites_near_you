import React, { Component } from 'react';

import withLocation from './withLocation';

class App extends Component {

  componentDidMount() {

  }


  render() {
    const { location } = this.props;

    return (
      <div className="App">
          <p>
            Current Location: {location.latitude}, {location.longitude}
          </p>
      </div>
    );
  }
}

export default withLocation(App);
