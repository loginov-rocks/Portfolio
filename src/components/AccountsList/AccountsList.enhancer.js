/* @flow */

import { connect } from 'react-redux';

const mapStateToProps = ({ diff }) => ({
  accounts: (diff && diff.account
    ? diff.account.filter(account => (
      account.archive === false && account.type !== 'debt'
    ))
    : []),
});

export default connect(mapStateToProps);
