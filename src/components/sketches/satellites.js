import FIXTURE_SATELLITES from '../../fixtures/satellites';

import { scaleLinear } from 'd3-scale';

const Y_AXIS = 1;
const X_AXIS = 2;
const c1 = '#3c3b52';
const c2 = '#252233';
const sat_color = ['rgba(19,212,233,.6)', 'rgba(19,212,233,1)'];

export default function sketch(p) {
  let sats = [];

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.satellites && props.satellites.length > 0) {
      sats = props.satellites;
    }
  };

  p.setup = function () {
    p.createCanvas(1040, 3000);

    p.background(c2);
    p.noLoop(); // frameRate(30); // TBD whether to keep this

    p.rectMode(p.CORNER);
    p.noStroke();
    p.textSize(20);
  };

  const drawSatellite = (x, y) => {
    const radius = 20;
    const wing = { 'w': 30, 'h': 18 };

    p.fill('#d2d2d2');
    p.rect(x - wing.w - radius / 2, y - (wing.h / 2), wing.w, wing.h, 3);
    p.rect(x + radius / 2, y - (wing.h / 2), wing.w, wing.h, 3);
    p.fill(p.color(sat_color[0]));
    p.ellipse(x, y, radius, radius);
    p.fill(p.color(sat_color[1]));
    p.ellipse(x, y, radius * .8, radius * .8);
    p.fill('white');
    p.ellipse(x, y, 2, 2);
  }

  p.draw = () => {
    p.background(c2);

    // Set the left and top margin
    const margin = 40;
    p.translate(margin, margin);

    const x = [];
    const y = [];

    const yMin = p.height - margin * 2;
    const yMax = 0;
    const yScale = scaleLinear()
      .domain([300, 40000]) // vs calculating based on empirical data
      .range([yMin, yMax]);

    const xMin = 0;
    const xMax = p.width - margin * 2;
    sats.forEach(sat => {
      x.push(p.random(xMin, xMax ));
      y.push(yScale(sat.satalt)); // altitude
    });

    sats.forEach((sat, i) => {
      drawSatellite(x[i], y[i]);
    });
  };
};
