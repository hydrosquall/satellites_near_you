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
      <>
      <div className={styles.app}>
        <Header location={location} satellites={satellites}/>
      </div>
        {hasSatellites ? <P5Wrapper sketch={sketch} satellites={satellites}/>
                       : <div className={styles.loader}>
                          <p> Satellites are spinning overhead, stand by... </p>
                          <ul className={styles.spinner}>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                       </div>  }
      </>
    );
  }
}

export default AppView;
