import React from 'react';

import { formatNumber } from 'humanize-plus';

const Header = ({ satellites, location}) => {
  return (
    <>
      <h1>Satellites Near You</h1>
      <p>
        {satellites.length} satellites from the UCS database are above ({formatNumber(location.latitude, 2)}, {formatNumber(location.longitude, 2)})
      </p>
    </>
    );
}

export default Header;
