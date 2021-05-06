import { Position } from './Interfaces/Position';

export const annualizePercent = (percent: number, fromDate: string, toDate?: string): number => {
  if (percent === 0) {
    return 0;
  }

  const from = new Date(fromDate).getTime();
  const to = toDate ? new Date(toDate).getTime() : Date.now();

  if (to === from) {
    return 0;
  }

  const oneYear = 24 * 60 * 60 * 1000 * 365.25;

  const years = (to - from) / oneYear;

  return percent / years;
};

export const getUniqueSymbolsFromPositions = (positions: Position[]): string[] => Array.from(
  new Set(positions.map((position) => position.symbol)),
);
