import React from 'react';

// Harcoded as a fallback
const NEW_YORK_LOCATION = {
  latitude: 40.7238086,
  longitude: -73.97646069999999,
}

const withLocation = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      location: NEW_YORK_LOCATION
    }

    componentDidMount() {
      this.getLocationPromise()
        .then(data => this.setState({location: data.coords}) )
        .then(data => this.setState({ data }));
    }

    getLocationPromise = () => {
      if (navigator) {
        return new Promise(
          (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
        )
      } else {
        return new Promise(
          resolve => resolve({
            coords: NEW_YORK_LOCATION
          })
        )
      }
    }

    render() {
      return  <WrappedComponent location={this.state.location} {...this.props}/>
    }
  }
}


export default withLocation;
