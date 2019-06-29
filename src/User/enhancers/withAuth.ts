import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { compose, branch, renderNothing } from 'recompose';

const mapStateToProps = ({ firebase: { auth } }) => ({ auth });

export default compose(
  connect(mapStateToProps),
  branch(
    ({ auth }) => isEmpty(auth) || !isLoaded(auth),
    renderNothing,
  ),
);
