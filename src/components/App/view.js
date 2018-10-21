import React, { Component } from 'react';

import { formatNumber } from 'humanize-plus';

import styles from './styles.module.scss';

class AppView extends Component {

  render() {
    const { location, satellites } = this.props;
    console.log(satellites);

    return (
      <div className={styles.app}>

        <h1>Satellites Overhead</h1>
        <p>
          {satellites.length} satellites over your location ({formatNumber(location.latitude, 2)}, {formatNumber(location.longitude, 2)})
        </p>

        <ul>
          {
            satellites.map((row, i) => {
              return (
                <li key={i}>
                  {row.satname}
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default AppView;
