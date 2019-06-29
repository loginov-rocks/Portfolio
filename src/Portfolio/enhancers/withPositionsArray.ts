/* @flow */

import { firebaseCollectionToArray } from 'Shared/lib/transform';

import withPositions from './withPositions';

const withPositionsArray = withPositions(firebaseCollectionToArray);

export default withPositionsArray;
