import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import State from 'State';

import { FetchLogo, fetchLogo as fetchLogoAction } from '../actions';

// TODO: Tests.

interface EnhancedProps {
  symbol: string;
}

interface StateProps {
  logos: Repository<string, string>;
}

interface DispatchProps {
  fetchLogo: FetchLogo;
}

export interface Props extends EnhancedProps {
  logo: string | null;
  logoProgress: boolean;
}

const mapStateToProps = ({ stocks: { logos } }: State): StateProps => ({ logos });

const mapDispatchToProps = { fetchLogo: fetchLogoAction };

export default compose<Props, EnhancedProps>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<EnhancedProps & StateProps & DispatchProps, {}>({

    componentDidMount() {
      const { fetchLogo, symbol } = this.props;

      if (symbol) {
        fetchLogo(symbol);
      }
    },

    componentDidUpdate(prevProps) {
      const { fetchLogo, symbol } = this.props;

      if (symbol && symbol !== prevProps.symbol) {
        fetchLogo(symbol);
      }
    },

  }),
  mapProps<Props, EnhancedProps & StateProps & DispatchProps>(({
    fetchLogo, logos, symbol, ...props
  }) => {
    const logo = getResourceById(logos, symbol);

    return {
      logo: extractData(logo),
      logoProgress: isRequested(logo),
      symbol,
      ...props,
    };
  }),
);
