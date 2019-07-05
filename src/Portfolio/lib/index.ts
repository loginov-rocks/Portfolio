// TODO: Tests.

export interface Position {
  id: string;
  symbol: string;
  amount: number;

  openPrice: number;
  openCommission: number;
  openDate: string;

  closePrice: number | null;
  closeCommission: number | null;
  closeDate: string | null;
}

export const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

export const getUniqueSymbolsFromPositions = (positions: Position[]): string[] => Array.from(
  new Set(positions.map(position => position.symbol)),
);
