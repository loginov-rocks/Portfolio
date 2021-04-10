import { ClosedPositionDocument } from './ClosedPositionDocument';

export interface ClosedPositionsCollection {
  [positionId: string]: ClosedPositionDocument;
}
