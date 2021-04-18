import { connect, ConnectedProps } from 'react-redux';

import { fetchVibrantPalette } from 'Layers/Application/ActionCreators/FirebaseActionCreators/FirebaseActionCreators';
import {
  VibrantPaletteData as _VibrantPaletteData, VibrantPalettesState,
} from 'Layers/Application/States/FirebaseState/FirebaseState';
import State from 'State';

interface StateProps {
  vibrantPalettes: VibrantPalettesState;
}

const mapStateToProps = ({ firebase: { functions: { vibrantPalettes } } }: State): StateProps => ({ vibrantPalettes });

const mapDispatchToProps = { fetchVibrantPalette };

export type VibrantPaletteData = _VibrantPaletteData;

export const VibrantPalettesConnector = connect(mapStateToProps, mapDispatchToProps);

export type VibrantPalettesConnectorProps = ConnectedProps<typeof VibrantPalettesConnector>;
