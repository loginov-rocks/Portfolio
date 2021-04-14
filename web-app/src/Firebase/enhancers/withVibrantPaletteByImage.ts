import { connect } from 'react-redux';
import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  fetchVibrantPalette as fetchVibrantPaletteAction, FetchVibrantPaletteAction,
} from 'Layers/Application/ActionCreators/FirebaseActionCreators/FirebaseActionCreators';
import State from 'State';

import VibrantPalette from '../lib/Functions/VibrantPalette';

// TODO: Tests.

interface StateProps {
  vibrantPalettes: Repository<VibrantPalette, string>;
}

interface DispatchProps {
  fetchVibrantPalette: FetchVibrantPaletteAction;
}

interface ImageExtractor<OwnProps> {
  (ownProps: OwnProps): string | null;
}

export interface Props {
  vibrantPalette: VibrantPalette | null;
  vibrantPaletteProgress: boolean;
}

const mapStateToProps = ({ firebase: { functions: { vibrantPalettes } } }: State): StateProps => ({ vibrantPalettes });

const mapDispatchToProps = { fetchVibrantPalette: fetchVibrantPaletteAction };

export default <OwnProps>(
  imageExtractor: ImageExtractor<OwnProps>,
): ComponentEnhancer<Props, OwnProps> => compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<OwnProps & StateProps & DispatchProps, Record<string, never>>({

    componentDidMount() {
      const { fetchVibrantPalette } = this.props;
      const image = imageExtractor(this.props);

      if (image !== null) {
        fetchVibrantPalette(image);
      }
    },

    componentDidUpdate(prevProps) {
      const { fetchVibrantPalette } = this.props;
      const image = imageExtractor(this.props);

      if (image !== null && image !== imageExtractor(prevProps)) {
        fetchVibrantPalette(image);
      }
    },

  }),
  mapProps<Props, OwnProps & StateProps & DispatchProps>((props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fetchVibrantPalette, vibrantPalettes, ...returnedProps } = props;
    const image = imageExtractor(props);
    const vibrantPalette = image !== null ? getResourceById(vibrantPalettes, image) : null;

    return {
      vibrantPalette: extractData(vibrantPalette),
      vibrantPaletteProgress: isRequested(vibrantPalette),
      ...returnedProps,
    };
  }),
);
