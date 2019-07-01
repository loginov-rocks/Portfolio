import { connect } from 'react-redux';

import { State } from '../../reducer';

interface StateProps {
  routeParams: {
    [key: string]: any;
  };
}

const mapStateToProps = ({ app: { routeParams } }: State): StateProps => ({ routeParams });

export default connect<StateProps, {}, {}, State>(mapStateToProps);
