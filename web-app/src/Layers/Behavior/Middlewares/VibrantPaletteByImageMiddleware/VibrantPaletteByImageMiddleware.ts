import {
  ComponentEnhancer, compose, lifecycle, mapProps,
} from 'recompose';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import {
  VibrantPaletteData, VibrantPalettesConnector, VibrantPalettesConnectorProps,
} from 'Layers/Adapter/Connectors/VibrantPalettesConnector/VibrantPalettesConnector';

interface MapProps {
  vibrantPalette: VibrantPaletteData;
  vibrantPaletteProgress: boolean;
}

export type VibrantPaletteByImageMiddlewareProps = MapProps;

interface ImageExtractor<OwnProps> {
  (ownProps: OwnProps): string | null;
}

// eslint-disable-next-line max-len
export const VibrantPaletteByImageMiddleware = <OwnProps>(imageExtractor: ImageExtractor<OwnProps>): ComponentEnhancer<OwnProps & VibrantPaletteByImageMiddlewareProps, OwnProps> => (
  compose(
    VibrantPalettesConnector,
    lifecycle<OwnProps & VibrantPalettesConnectorProps, Record<string, never>>({

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
    mapProps<MapProps, OwnProps & VibrantPalettesConnectorProps>((props) => {
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
  )
);
