import React, { Component } from 'react';
import { compose } from "recompose";
import { zipObject } from 'lodash';

import withLocation from '../withLocation';
import withEnigmaTable from '../withEnigmaTable';
import withSatellites from '../withSatellites';

import AppView from './view';

import FIXTURE_SATELLITES from '../../fixtures/satellites';

const USE_FIXTURES = true;

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
    return <AppView
              {...this.props}
              satellites={this.getEnhancedSatellites()}
            />
  }
}

export default compose(
  withSatellites,
  withLocation,
  withEnigmaTable,
)(AppContainer);
