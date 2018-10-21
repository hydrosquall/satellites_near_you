import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

const Y_AXIS = 1;
const X_AXIS = 2;
const c1 = '#3c3b52';
const c2 = '#252233';

const CANVAS_WIDTH = 1040;
const CANVAS_HEIGHT = 3000;

const WING_COLOR = '#d2d2d2';

const USER_CATEGORY = {
  commercial: 'Commercial',
  government: 'Government',
  military: 'Military',
  civil: 'Civil',
}

const USER_COLOR_MAP = {
  [USER_CATEGORY.commercial]: ['rgba(19,212,233,0.6)', 'rgba(19,212,233,1)'],
  [USER_CATEGORY.government]: ['rgba(255,232,83,0.6)', 'rgba(255,232,83,1)'],
  [USER_CATEGORY.military]: ['rgba(83,120,56,0.6)', 'rgba(83,120,56,1)'],
  [USER_CATEGORY.civil]: ['rgba(228,104,85,0.6)', 'rgba(228,104,85,1)'],
}

const getSatelliteUser = (satellite) => {
  const { users } = satellite;
  const categories = Object.keys(USER_COLOR_MAP);

  let finalCategory = USER_CATEGORY.commercial; // default
  for (let i in categories) {
    if (users.startsWith(categories[i])) {
      return categories[i];
    }
  }
  return finalCategory;
}

export default function sketch(p) {
  let sats = [];

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.satellites && props.satellites.length > 0) {
      sats = props.satellites;
    }
  };

  p.setup = function () {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    p.background(c2);
    // p.noLoop(); // frameRate(30); // TBD whether to keep this

    p.rectMode(p.CORNER);
    p.noStroke();
    p.textSize(20);
  };

  const drawSatellite = (x, y, sat) => {
    const radius = 20;
    const wing = { 'w': 30, 'h': 18 };

    const user = getSatelliteUser(sat);
    const color = USER_COLOR_MAP[user];

    p.fill(WING_COLOR);

    const yPos = y - (wing.h / 2);
    p.rect(x - wing.w - radius / 2, yPos, wing.w, wing.h, 3);
    p.rect(x + radius / 2, yPos, wing.w, wing.h, 3);
    p.fill(p.color(color[0]));
    p.ellipse(x, y, radius, radius);
    p.fill(p.color(color[1]));
    p.ellipse(x, y, radius * .8, radius * .8);
    p.fill('white');
    p.ellipse(x, y, 2, 2);
  }

  p.draw = () => {
    p.background(c2);

    // Set the left and top margin
    const margin = 40;
    p.translate(margin, margin);

    const yMin = p.height - margin * 2;
    const yMax = 0;
    const yScale = scaleLinear()
      .domain([300, 40000]) // vs calculating based on empirical data
      .range([yMin, yMax]);

    const xMin = 0;
    const xMax = p.width - margin * 2;

    const xDomain = extent(sats, sat => sat.age)

    const xScale = scaleLinear()
      .domain(xDomain) // vs calculating based on empirical data
      .range([xMin, xMax]);

    const x = sats.map(sat => xScale(sat.age));
    // const x = sats.map(sat => p.random(xMin, xMax));
    const y = sats.map(sat => yScale(sat.satalt));

    sats.forEach((sat, i) => {
      drawSatellite(x[i], y[i], sat);
    });
  };
};
