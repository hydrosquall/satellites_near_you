import React, { Component } from 'react';

// Via https://medium.com/front-end-hacking/the-building-of-threadd-react-three-js-p5-js-fc988e687686
import P5Wrapper from '../P5Wrapper'; // custom fork

import sketch from '../sketches/satellites';

import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.module.scss';

class AppView extends Component {

  render() {
    const { location, satellites, numSatellites } = this.props;
    const hasSatellites = satellites.length > 0;

    return (
      <>
        <Header/>
        {hasSatellites ? <P5Wrapper sketch={sketch} satellites={satellites}/>
                       : <div className={styles.loader}>
                          <p> Satellites are closer than they appear, please stand by... </p>
                          <ul className={styles.spinner}>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                       </div>
        }
        <div className={styles.app}>
          <Footer location={location} satellites={satellites} numSatellites={numSatellites} />
        </div>
      </>
    );
  }
}

export default AppView;
