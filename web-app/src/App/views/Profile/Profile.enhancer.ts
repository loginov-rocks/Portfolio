import { connect } from 'react-redux';

import { resetVibrantPalettes, ResetVibrantPalettesAction } from 'Firebase/actions';
import { ProfileState } from 'Firebase/State';
import State from 'State';
import {
  resetLogos, ResetLogosAction, resetQuotes, ResetQuotesAction,
} from 'Stocks/actions';

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
