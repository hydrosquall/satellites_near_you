import React from 'react';

import { formatNumber } from 'humanize-plus';


const Header = ({ satellites, location}) => {
  return (
    <>
      <h1>Satellites Overhead</h1>
      <p>
        There are {satellites.length} satellites over your location ({formatNumber(location.latitude, 2)}, {formatNumber(location.longitude, 2)})
      </p>
    </>
    );
}

export default Header;
