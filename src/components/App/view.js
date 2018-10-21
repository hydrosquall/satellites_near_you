import React, { Component } from 'react';

// Via https://medium.com/front-end-hacking/the-building-of-threadd-react-three-js-p5-js-fc988e687686
import P5Wrapper from '../P5Wrapper'; // custom fork

import sketch from '../sketches/satellites';

import Header from '../Header';
import styles from './styles.module.scss';

class AppView extends Component {

  render() {
    const { location, satellites } = this.props;
    const hasSatellites = satellites.length > 0;

    return (
      <div className={styles.app}>
        <Header location={location} satellites={satellites}/>
        {hasSatellites && <P5Wrapper sketch={sketch} satellites={satellites}/>}
      </div>
    );
  }
}

export default AppView;
