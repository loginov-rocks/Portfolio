import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import State from 'State';

import { fetchRates, FetchRatesAction } from '../actions';
import { Rates } from '../State';

// TODO: Tests.

interface StateProps {
  rates: Rates | null;
  ratesLoading: boolean;
}

interface DispatchProps {
  fetchRates: FetchRatesAction;
}

export interface Props extends StateProps, DispatchProps {
  // Export one interface for ease of use.
}

const mapStateToProps = ({ rates: { loading, rates } }: State): StateProps => ({
  rates,
  ratesLoading: loading,
});

const mapDispatchToProps = { fetchRates };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<StateProps & DispatchProps, {}>({

    componentDidMount() {
      this.props.fetchRates();
    },

  }),
);
