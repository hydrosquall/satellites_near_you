import React, { Component } from 'react';

import _ from 'lodash';
// import { isoParse } from 'd3-time-format';

// Harcoded as a fallback
const ROW_LIMIT = 200;
const ENIGMA_URL = `https://public.enigma.com/api/snapshots/80ff1b25-ad52-4461-acc9-d356624c88c2?&row_limit=${ROW_LIMIT}&row_offset=0`;

const withEnigmaTable = (WrappedComponent) => {
  return class extends Component {
    state = {
      enigmaTable: []
    }

    componentDidMount = () => {
      fetch(ENIGMA_URL)
        .then((response) => response.json())
        .then((payload) => {
          const headers = payload.fields.map(x => x.name);
          const rows = payload.table_rows.rows;
          const raw_table = rows.map(function (row) {
            return _.zipObject(headers, row);

          })

          // todo: replace with ramda lens
          const table = raw_table.map(function (row) {
            // row.start_datetime = isoParse(row.start_datetime);
            // row.end_datetime = isoParse(row.end_datetime);
            return row;
          })

          this.setState({ enigmaTable: table });
        })
    }

    render() {
      return <WrappedComponent enigmaTable={this.state.enigmaTable} {...this.props} />
    }
  }
}


export default withEnigmaTable;
