import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import { fetchLogo as fetchLogoAction } from '../actions';

interface Props {
  fetchLogo: (symbol: string) => void;
  symbol: string;
}

const mapStateToProps = ({ stocks: { logos } }): { logos: [] } => ({ logos });

const mapDispatchToProps = { fetchLogo: fetchLogoAction };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<Props, {}>({

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
  mapProps(({
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
