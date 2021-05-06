import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  VibrantPaletteData, VibrantPalettesConnector, VibrantPalettesConnectorProps,
} from 'Layers/Adapter/Connectors/VibrantPalettesConnector/VibrantPalettesConnector';
// TODO: Move to Infrastructure layer.
import { areArraysEqual } from 'Shared/lib';

interface VibrantPalettesByImages {
  [key: string]: {
    vibrantPalette: VibrantPaletteData;
    progress: boolean;
  };
}

interface MapProps {
  vibrantPalettesByImages: VibrantPalettesByImages;
}

export type VibrantPalettesByImagesMiddlewareProps = MapProps;

interface ImagesExtractor<OwnProps> {
  (ownProps: OwnProps): string[];
}

// eslint-disable-next-line max-len
export const VibrantPalettesByImagesMiddleware = <OwnProps>(imagesExtractor: ImagesExtractor<OwnProps>): ComponentEnhancer<OwnProps & VibrantPalettesByImagesMiddlewareProps, OwnProps> => (
  compose(
    VibrantPalettesConnector,
    lifecycle<OwnProps & VibrantPalettesConnectorProps, Record<string, never>>({

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
    mapProps<MapProps, OwnProps & VibrantPalettesConnectorProps>((props) => {
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
  )
);
