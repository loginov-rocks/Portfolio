import { connect } from 'react-redux';

import {
  resetVibrantPalettes, ResetVibrantPalettesAction,
} from 'Layers/Application/ActionCreators/FirebaseActionCreators/FirebaseActionCreators';
import {
  resetLogos, ResetLogosAction, resetQuotes, ResetQuotesAction,
} from 'Layers/Application/ActionCreators/StocksActionCreators/StocksActionCreators';
import { ProfileState } from 'Layers/Application/States/FirebaseState/FirebaseState';
import State from 'State';

interface StateProps {
  profile: ProfileState;
}

interface DispatchProps {
  resetLogos: ResetLogosAction;
  resetQuotes: ResetQuotesAction;
  resetVibrantPalettes: ResetVibrantPalettesAction;
}

const mapStateToProps = ({ firebase: { firebase: { profile } } }: State): StateProps => ({ profile });

const mapDispatchToProps = { resetLogos, resetQuotes, resetVibrantPalettes };

export default connect<StateProps, DispatchProps, Record<string, never>, State>(mapStateToProps, mapDispatchToProps);
