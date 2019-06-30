import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { fetchDiff as fetchDiffAction } from '../../actions';
import Authorize from '../Authorize';
import withAuth from '../../enhancers/withAuth';

interface Props {
  fetchDiff: () => void;
}

const mapDispatchToProps = { fetchDiff: fetchDiffAction };

export default compose(
  withAuth(Authorize),
  connect(null, mapDispatchToProps),
  lifecycle<Props, {}>({

    componentDidMount() {
      const { fetchDiff } = this.props;

      fetchDiff();
    },

  }),
);
