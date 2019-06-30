import { connect } from 'react-redux';

const mapStateToProps = ({ app: { route } }): { route: string } => ({ route });

export default connect(mapStateToProps);
