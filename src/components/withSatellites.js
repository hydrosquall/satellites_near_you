import React, { Component } from 'react';

import _ from 'lodash';
// import { isoParse } from 'd3-time-format';

// Harcoded as a fallback
// TODO: put API key somewhere secure
const API_KEY = "RUQNV8-229QR9-S5DTK3-3WI1";
const SATELLITE_BASE = `https://www.n2yo.com/rest/v1/satellite/above`;

const withSatellites = (WrappedComponent) => {
  return class extends Component {
    state = {
      satellites: []
    }

    componentDidMount = () => {

      const { latitude, longitude } = this.props;
      const altitude = 0;
      const radius = 20; // degrees
      const category_id = 0; // 0 includes all cats

      const url = `${SATELLITE_BASE}/${latitude}/${longitude}/${altitude}/${radius}/${category_id}/&apiKey=${API_KEY}`;

      fetch(url)
        .then((response) => response.json())
        .then((payload) => {
          const satellites = payload.above || [];
          this.setState({ satellites });
        })
    }

    render() {
      return <WrappedComponent satellites={this.state.satellites} {...this.props} />
    }
  }
}


export default withSatellites;
