import { OpenPositionDocument } from './OpenPositionDocument';

export interface OpenPositionsCollection {
  [positionId: string]: OpenPositionDocument;
}
