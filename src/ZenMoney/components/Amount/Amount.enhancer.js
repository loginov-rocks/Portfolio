/* @flow */

import { connect } from 'react-redux';

const mapStateToProps = ({ zenMoney: { instruments } }, { instrumentId }) => ({
  instrument: instruments.find(({ id }) => id === instrumentId),
});

export default connect(mapStateToProps);
