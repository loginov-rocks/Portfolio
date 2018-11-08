/* @flow */

import { connect } from 'react-redux';

const mapStateToProps = ({ diff }) => ({
  accounts: diff && diff.account ? diff.account : [],
});

export default connect(mapStateToProps);
