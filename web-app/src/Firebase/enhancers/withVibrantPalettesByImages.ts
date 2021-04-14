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
import { areArraysEqual } from 'Shared/lib';
import State from 'State';

import VibrantPalette from '../lib/Functions/VibrantPalette';

// TODO: Tests.

interface ImagesExtractor<OwnProps> {
  (ownProps: OwnProps): string[];
}

interface StateProps {
  vibrantPalettes: Repository<VibrantPalette, string>;
}

interface DispatchProps {
  fetchVibrantPalette: FetchVibrantPaletteAction;
}

interface VibrantPalettesByImages {
  [key: string]: {
    vibrantPalette: VibrantPalette | null;
    progress: boolean;
  };
}

export interface Props {
  vibrantPalettesByImages: VibrantPalettesByImages;
}

const mapStateToProps = ({ firebase: { functions: { vibrantPalettes } } }: State): StateProps => ({ vibrantPalettes });

const mapDispatchToProps = { fetchVibrantPalette: fetchVibrantPaletteAction };

export default <OwnProps>(
  imagesExtractor: ImagesExtractor<OwnProps>,
): ComponentEnhancer<Props, OwnProps> => compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<OwnProps & StateProps & DispatchProps, Record<string, never>>({

    componentDidMount() {
      const { fetchVibrantPalette } = this.props;
      const images = imagesExtractor(this.props);

      images.forEach((image) => fetchVibrantPalette(image));
    },

    componentDidUpdate(prevProps) {
      const { fetchVibrantPalette } = this.props;
      const images = imagesExtractor(this.props);

      if (!areArraysEqual(images, imagesExtractor(prevProps))) {
        images.forEach((image) => fetchVibrantPalette(image));
      }
    },

  }),
  mapProps<Props, OwnProps & StateProps & DispatchProps>((props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fetchVibrantPalette, vibrantPalettes, ...returnedProps } = props;
    const vibrantPalettesByImages: VibrantPalettesByImages = {};
    const images = imagesExtractor(props);

    images.forEach((image) => {
      const resource = getResourceById(vibrantPalettes, image);

      vibrantPalettesByImages[image] = {
        progress: isRequested(resource),
        vibrantPalette: extractData(resource),
      };
    });

    return {
      vibrantPalettesByImages,
      ...returnedProps,
    };
  }),
);
