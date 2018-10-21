import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = 3000;

const WING_COLOR = '#d2d2d2';
const MARGIN = 40;

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
  let x = [];
  let y = [];

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.satellites && props.satellites.length > 0) {
      sats = props.satellites;
      const categories = getSatelliteCategories();
      const [tempX, tempY] = getCoordinates(categories);
      x = tempX;
      y = tempY;
    }
  };


  const getSatelliteCategories = () => {
    const cats  = [[], [], []]; // TODO: parametrize num categories

    for (const i in sats) {
      if (sats[i].satalt < 1000) {
        cats[0].push(sats[i]);
      } else if (sats[i].satalt < 30000) {
        cats[1].push(sats[i]);
      } else {
        cats[2].push(sats[i]);
      }
    }

    return cats;
  }

  const getCoordinates = (categories) => {
    const x = [];
    const y = []

    for (const i in categories) {
      for (const j in categories[i]) {
        x.push(p.random(0, p.width - MARGIN * 2));
        y.push(p.random((2 - i) * 1250 + 50, (3 - i) * 1250 - 50));
      }
    }

    return [x, y];
  }

  p.setup = function () {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    // p.background(c2);
    // p.noLoop(); // frameRate(30); // TBD whether to keep this

    p.frameRate(30);

    p.rectMode(p.CORNER);
    p.noStroke();

    const categories = getSatelliteCategories();
    const [tempX, tempY] = getCoordinates(categories);
    x = tempX;
    y = tempY;
    // p.textSize(20);
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

  const setGradient = (x, y, w, h, c1, c2, c3) =>{
    p.noFill();

    for (var i = y; i <= y + h; i++) {
      var inter = p.map(i, y, y + h, 0, 1);
      var c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(x, i, x + w, i);
    }

    var updated_y = y + h;

    for (var i = updated_y; i <= updated_y + h; i++) {
      var inter = p.map(i, updated_y, updated_y + h, 0, 1);
      var c = p.lerpColor(c2, c3, inter);
      p.stroke(c);
      p.line(x, i, x + w, i);
    }
  }

  const drawBackground = () => {
    const c1 = p.color(60, 59, 82);
    const c2 = p.color(154, 91, 102);
    const c3 = p.color(160, 216, 236);

    const gradientHeight = p.height / 2;

    setGradient(0, 0, p.width, gradientHeight, c1, c2, c3);
    setGradient(500, 0, p.width, gradientHeight, c1, c2, c3);
    setGradient(1000, 0, p.width, gradientHeight, c1, c2, c3);
  }

  const drawEverything = () => {
    drawBackground();
    const margin = 40;
    p.translate(margin, margin);

    const yMin = p.height - MARGIN * 2;
    const yMax = 0;
    const yScale = scaleLinear()
      .domain([300, 40000]) // vs calculating based on empirical data
      .range([yMin, yMax]);

    const xMin = MARGIN;
    const xMax = p.width - MARGIN * 2;

    const xDomain = extent(sats, sat => sat.age)

    const xScale = scaleLinear()
      .domain(xDomain) // vs calculating based on empirical data
      .range([xMin, xMax]);

    // const x = sats.map(sat => xScale(sat.age));
    // const x = sats.map(sat => p.random(xMin, xMax));
    // const y = sats.map(sat => yScale(sat.satalt));


    sats.forEach((sat, i) => {
      drawSatellite(x[i], y[i], sat);
    });
  }

  p.draw = () => {
    drawEverything();
  };
};
