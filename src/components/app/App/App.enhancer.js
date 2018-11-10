/* @flow */

import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { fetchDiff } from '../../../actions/zenMoney';
import withAuth from '../../../enhancers/withAuth';
import withStockQuotesUpdater from '../../../enhancers/withStockQuotesUpdater';
import Authorize from '../../zenMoney/Authorize';

const mapStateToProps = ({ diff }) => ({ diff });

const mapDispatchToProps = { fetchDiff };

export default compose(
  withAuth(Authorize),
  withStockQuotesUpdater,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const { fetchDiff } = this.props;

      fetchDiff();
    },

  }),
);
