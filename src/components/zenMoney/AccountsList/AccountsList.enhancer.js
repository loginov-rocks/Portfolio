/* @flow */

import { connect } from 'react-redux';

import { setBrokerageAccount } from '../../../actions/zenMoney';

const mapStateToProps = ({ zenMoney: { brokerageAccountId, diff } }) => ({
  accounts: (diff && diff.account
    ? diff.account.filter(account => (
      account.archive === false && account.type !== 'debt'
    ))
    : []),
  brokerageAccountId,
});

const mapDispatchToProps = { setBrokerageAccount };

export default connect(mapStateToProps, mapDispatchToProps);
