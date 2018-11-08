/* @flow */

import { connect } from 'react-redux';

const mapStateToProps = ({ diff }, { instrumentId }) => ({
  instrument: (diff && diff.instrument
    ? diff.instrument.find(({ id }) => id === instrumentId)
    : undefined),
});

export default connect(mapStateToProps);
