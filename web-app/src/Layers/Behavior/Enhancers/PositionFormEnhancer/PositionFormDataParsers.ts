export const parseDateString = (value: string): string => {
  let date;

  try {
    date = new Date(value);
  } catch {
    date = new Date();
  }

  return date.toISOString().slice(0, 10);
};

export const parseNonNegativeFloat = (value: string): number | '' => {
  const float = parseFloat(value);

  return float >= 0 ? float : '';
};

export const parsePositiveInteger = (value: string): number | '' => {
  const integer = parseInt(value, 10);

  return integer > 0 ? integer : '';
};
