import { colors } from '@material-ui/core';

// TODO: Make palette more vibrant.
const palette: string[] = [
  colors.amber.A700,
  colors.blue.A700,
  colors.blueGrey.A700,
  colors.brown.A700,
  colors.cyan.A700,
  colors.deepOrange.A700,
  colors.deepPurple.A700,
  colors.green.A700,
  colors.indigo.A700,
  colors.lightBlue.A700,
  colors.lightGreen.A700,
  colors.lime.A700,
  colors.orange.A700,
  colors.pink.A700,
  colors.purple.A700,
  colors.red.A700,
  colors.teal.A700,
  colors.yellow.A700,
];

export default (hash: string): string => {
  let sum = 0;

  for (let i = 0; i < hash.length; i += 1) {
    sum += hash.charCodeAt(i);
  }

  const index = sum % palette.length;

  return palette[index];
};
