import React, { Component } from 'react';
import { compose } from "recompose";
import { zipObject } from 'lodash';
import { isoParse } from 'd3-time-format';

import withLocation from '../withLocation';
import withEnigmaTable from '../withEnigmaTable';
import withSatellites from '../withSatellites';

import AppView from './view';

import FIXTURE_SATELLITES from '../../fixtures/satellites';

const USE_FIXTURES = false;

class AppContainer extends Component {

  getEnhancedSatellites = () => {
    if (USE_FIXTURES) {
      return FIXTURE_SATELLITES;
    }

    const { satellites, enigmaTable } = this.props;

    const satelliteIds = enigmaTable.map(sat => sat.norad_number);
    const satelliteLookup = zipObject(satelliteIds, enigmaTable);

    const enhancedSatellites = satellites.map(satellite => {
      const metadata = satelliteLookup[`${satellite.satid}.0`] || {}; // NORAD Identifier

      return {
        ...satellite,
        ...metadata,
      }
    })
    const filtered = enhancedSatellites.filter(satellite => satellite.norad_number);
    return filtered;
  }

  render () {

    let satellites = this.getEnhancedSatellites();
    const today = new Date();
    const thisYear = today.getFullYear(); // or get num days...


    satellites = satellites.map(sat => {
      const launchDate = isoParse(sat.date_of_launch);
      const launchYear = launchDate.getFullYear();
      return {
        ...sat,
        age: thisYear - launchYear,
        launchYear: launchYear,
      }
    });

    // console.log(satellites);
    const { satellites:rawSatellites } = this.props;
    return <AppView
              {...this.props}
              numSatellites={rawSatellites.length}
              satellites={satellites}
            />
  }
}

export default compose(
  withSatellites,
  withLocation,
  withEnigmaTable,
)(AppContainer);
