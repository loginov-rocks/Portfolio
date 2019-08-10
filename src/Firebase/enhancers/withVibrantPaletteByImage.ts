import { connect } from 'react-redux';
import { compose, lifecycle, mapProps } from 'recompose';
import { Repository } from 'redux-repository/lib/interfaces';
import { getResourceById } from 'redux-repository/lib/repository';
import { extractData, isRequested } from 'redux-repository/lib/resource';

import State from 'State';

import { fetchVibrantPalette as fetchVibrantPaletteAction, FetchVibrantPaletteAction } from '../actions';
import VibrantPalette from '../lib/Functions/VibrantPalette';

// TODO: Tests.

interface EnhancedProps {
  image: string;
}

interface StateProps {
  vibrantPalettes: Repository<VibrantPalette, string>;
}

interface DispatchProps {
  fetchVibrantPalette: FetchVibrantPaletteAction;
}

interface ImageExtractor<OwnProps> {
  (ownProps: OwnProps): string | null;
}

export interface Props extends EnhancedProps {
  vibrantPalette: VibrantPalette | null;
  vibrantPaletteProgress: boolean;
}

const mapStateToProps = ({ firebase: { functions: { vibrantPalettes } } }: State): StateProps => ({ vibrantPalettes });

const mapDispatchToProps = { fetchVibrantPalette: fetchVibrantPaletteAction };

export default <OwnProps>(imageExtractor: ImageExtractor<OwnProps>) => compose<Props, OwnProps & EnhancedProps>(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<OwnProps & EnhancedProps & StateProps & DispatchProps, {}>({

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
  mapProps<Props, OwnProps & EnhancedProps & StateProps & DispatchProps>(({
    fetchVibrantPalette, vibrantPalettes, ...props
  }) => {
    // Ignore because rest props should be enough for image extractor.
    // @ts-ignore
    const image = imageExtractor(props);
    const vibrantPalette = image !== null ? getResourceById(vibrantPalettes, image) : null;

    return {
      vibrantPalette: extractData(vibrantPalette),
      vibrantPaletteProgress: isRequested(vibrantPalette),
      ...props,
    };
  }),
);
