import { connect } from 'react-redux';

const mapStateToProps = ({ app: { routeParams } }): { routeParams: {} } => ({ routeParams });

export default connect(mapStateToProps);
