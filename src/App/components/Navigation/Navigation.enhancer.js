/* @flow */

import { connect } from 'react-redux';

const mapStateToProps = ({ app: { route } }) => ({ route });

export default connect(mapStateToProps);
