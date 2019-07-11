import { connect } from 'react-redux';

import { ProfileState } from 'Firebase/State';
import State from 'State';

interface StateProps {
  profile: ProfileState;
}

const mapStateToProps = ({ firebase: { firebase: { profile } } }: State): StateProps => ({ profile });

export default connect<StateProps, {}, {}, State>(mapStateToProps);
