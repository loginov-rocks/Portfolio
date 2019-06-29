/* @flow */

import { connect } from 'react-redux';

const mapStateToProps = ({ app: { routeParams } }) => ({ routeParams });

const withRouteParams = connect(mapStateToProps);

export default withRouteParams;
