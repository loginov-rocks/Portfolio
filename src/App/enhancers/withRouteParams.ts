import { connect } from 'react-redux';

import State from 'State';

import { RouteParamsState } from '../State';

interface Props {
  routeParams: RouteParamsState;
}

const mapStateToProps = ({ app: { routeParams } }: State): Props => ({ routeParams });

export default connect<Props, {}, {}, State>(mapStateToProps);
