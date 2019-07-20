import { connect } from 'react-redux';

import { ProfileState } from 'Firebase/State';
import State from 'State';
import {
  ResetLogos, resetLogos, ResetQuotes, resetQuotes,
} from 'Stocks/actions';

interface StateProps {
  profile: ProfileState;
}

interface DispatchProps {
  resetLogos: ResetLogos;
  resetQuotes: ResetQuotes;
}

const mapStateToProps = ({ firebase: { firebase: { profile } } }: State): StateProps => ({ profile });

const mapDispatchToProps = { resetLogos, resetQuotes };

export default connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps);
