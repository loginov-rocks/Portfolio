/* @flow */

import { connect } from 'react-redux';

import { setBrokerageAccount } from '../../actions';

const mapStateToProps = ({ zenMoney: { accounts, brokerageAccountId } }) => ({
  accounts: accounts.filter(account => (
    account.archive === false && account.type !== 'debt'
  )),
  brokerageAccountId,
});

const mapDispatchToProps = { setBrokerageAccount };

export default connect(mapStateToProps, mapDispatchToProps);
