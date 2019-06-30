import { firebaseCollectionToArray } from 'Shared/lib/transform';

import withPositions from './withPositions';

export default withPositions(firebaseCollectionToArray);
