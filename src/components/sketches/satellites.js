// import { scaleLinear } from 'd3-scale';
// import { extent } from 'd3-array';
import { flatten } from 'lodash';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = 3750;

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
  let cats = [];

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.satellites && props.satellites.length > 0) {
      sats = props.satellites;
      cats = getSatelliteCategories();
      const [tempX, tempY] = getCoordinates(cats);
      x = tempX;
      y = tempY;
    }
  };


  const getSatelliteCategories = () => {
    const localCats  = [[], [], []]; // TODO: parametrize num categories
    for (const i in sats) {
      if (sats[i].satalt < 1000) {
        localCats[0].push(sats[i]);
      } else if (sats[i].satalt < 30000) {
        localCats[1].push(sats[i]);
      } else {
        localCats[2].push(sats[i]);
      }
    }
    return localCats;
  }

  const getCoordinates = (categories) => {
    const x = [];
    const y = [];

    for (const i in categories) {
      const xLocal = [];
      const yLocal = [];
      for (const j in categories[i]) {
        xLocal.push(p.random(0, p.width - MARGIN * 2));
        yLocal.push(p.random((2 - i) * 1250 + 50, (3 - i) * 1250 - 50));
      }
      x.push(xLocal);
      y.push(yLocal);
    }

    return [x, y];
  }

  p.setup = function () {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    // p.background(c2);
    // p.noLoop(); // frameRate(30); // TBD whether to keep this

    p.frameRate(50);

    p.rectMode(p.CORNER);
    p.noStroke();

    cats = getSatelliteCategories();
    const [tempX, tempY] = getCoordinates(cats);
    x = tempX;
    y = tempY;
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

    const launchYear = sat.launchYear;
    // Add STRIPES
    if (launchYear <= 1979) {
      p.rect(x - wing.w * 2 / 3 - radius / 2 + 3, y - (wing.h / 2), 3, wing.h);
    }
    if (launchYear <= 1989) {
      p.rect(x - wing.w * 1 / 3 - radius / 2, y - (wing.h / 2), 3, wing.h);
    }
    if (launchYear <= 1999) {
      p.rect(x + wing.w * 1 / 3 + radius / 2, y - (wing.h / 2), 3, wing.h);
    }
    if (launchYear <= 2009) {
      p.rect(x + wing.w * 2 / 3 + radius / 2 - 3, y - (wing.h / 2), 3, wing.h);
    }
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

  const drawData = () => {
    drawBackground();
    const margin = 40;
    p.translate(margin, margin);

    // const yMin = p.height - MARGIN * 2;
    // const yMax = 0;
    // const yScale = scaleLinear()
    //   .domain([300, 40000]) // vs calculating based on empirical data
    //   .range([yMin, yMax]);

    // const xMin = MARGIN;
    // const xMax = p.width - MARGIN * 2;

    // const xDomain = extent(sats, sat => sat.age)

    // const xScale = scaleLinear()
    //   .domain(xDomain) // vs calculating based on empirical data
    //   .range([xMin, xMax]);

    // const x = sats.map(sat => xScale(sat.age));
    // const x = sats.map(sat => p.random(xMin, xMax));
    // const y = sats.map(sat => yScale(sat.satalt));

    // Draw SATELLITES
    p.noStroke()
    const flatX = flatten(x);
    const flatY = flatten(y);
    sats.forEach((sat, i) => {
      drawSatellite(flatX[i], flatY[i], sat);
    });

    // Draw Orbital Stripes
    p.stroke(255);
    p.line(p.width * 3 / 4, 1250, p.width, 1250);
    p.line(p.width * 3 / 4, 2500, p.width, 2500);
    p.push();
    p.textSize(24);
    p.textAlign(p.RIGHT);
    p.text('Lower Earth Orbit (LEO)', p.width - 60, CANVAS_HEIGHT - 60);
    p.text('Medium Earth Orbit (MEO)', p.width - 60, 2500 - 20);
    p.text('Geosynchronous Equatorial Orbit (GEO)', p.width - 60, 1250 - 20);
    p.pop();
  }


  const drawTooltip = () => {
    const margin = MARGIN;
    const wing = { 'w': 30, 'h': 18 };
    const radius = 20;

    const rectColor = p.color('rgba(10,10,10,.8)');

    // TODO: speed up the element lookup with a d3 quadtree
    for (const i in cats) {
      for (const j in cats[i]) {
        p.fill(rectColor);
        p.noStroke();

        const satX = x[i][j];
        const satY = y[i][j];
        const cat = cats[i][j];

        const isMouseOnSatellite = (
          p.mouseX - margin >= satX - wing.w - radius / 2 &&
          p.mouseX - margin <= satX + radius / 2 + wing.w &&
          p.mouseY - margin >= satY - (wing.h / 2) &&
          p.mouseY - margin <= satY + (wing.h / 2));

        if (isMouseOnSatellite) {
          const boxAnchorX = p.mouseX;
          const boxAnchorY = p.mouseY;

          var maxLength = cat.operator_owner.length;
          var rectWidth = (maxLength > 20 ? 250 + 5 * maxLength : 300);
          p.rect(boxAnchorX - 150, boxAnchorY - 200, rectWidth, 140, 10);

          p.fill('#fcd45a');
          p.textSize(20);
          p.textStyle(p.BOLD);

          p.text(cat.satname, boxAnchorX - 135, boxAnchorY - 170);
          p.fill(255);
          p.textSize(16);
          p.textStyle(p.NORMAL);
          p.text('operator:\t\t\t\t' + cat.operator_owner, boxAnchorX - 135, boxAnchorY - 150);
          p.text('country:\t\t\t\t\t' + cat.country_org_of_un_registry, boxAnchorX - 135, boxAnchorY - 130);
          p.text('launch mass:\t' + cat.launch_mass_kg + ' kg', boxAnchorX - 135, boxAnchorY - 110);
          p.text('launch date: \t' + cat.launchDate, boxAnchorX - 135, boxAnchorY - 90);

          return; // bail out early
        }
      }
    }

  }


  p.draw = () => {
    drawData();

    drawTooltip();
  };
};
