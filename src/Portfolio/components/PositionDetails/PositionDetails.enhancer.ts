import { withProps } from 'recompose';

import { calculateAnnualPLPercent, Position } from '../../lib';
import { Props } from './PositionDetails';

interface EnhancedProps {
  position: Position;
}

export default withProps<Partial<Props>, EnhancedProps>(({ position }) => {
  const openCost = position.amount * position.openPrice + position.openCommission;

  let annualPLPercent = null;
  let gainPL = null;
  let gainPLPercent = null;
  let closeReturn = null;

  if (position.closeCommission !== null && position.closeDate !== null && position.closePrice !== null) {
    closeReturn = position.amount * position.closePrice - position.closeCommission;
    gainPL = closeReturn - openCost;
    gainPLPercent = gainPL / openCost;
    annualPLPercent = calculateAnnualPLPercent(gainPLPercent, position.openDate, position.closeDate);
  }

  return {
    annualPLPercent, closeReturn, gainPL, gainPLPercent, openCost,
  };
});
