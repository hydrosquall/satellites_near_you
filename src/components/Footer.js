import React from 'react';

import { formatNumber } from 'humanize-plus';

const Footer = ({ satellites, location, numSatellites}) => {
  return (
    <>
      <h1>Metadata for Astronauts</h1>
      <p>
        {satellites.length} of {numSatellites} overhead satellites are tracked by the Union of Concerned Scientists
      </p>
      <p>
        Location: ({formatNumber(location.latitude, 2)}, {formatNumber(location.longitude, 2)})
      </p>
      <p>
    </>
    );
}

export default Footer;
