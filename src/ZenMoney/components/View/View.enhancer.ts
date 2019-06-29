import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { fetchDiff } from '../../actions';
import Authorize from '../Authorize';
import withAuth from '../../enhancers/withAuth';

const mapDispatchToProps = { fetchDiff };

export default compose(
  withAuth(Authorize),
  connect(null, mapDispatchToProps),
  lifecycle({

    componentDidMount() {
      const { fetchDiff } = this.props;

      fetchDiff();
    },

  }),
);
