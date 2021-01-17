import * as React from 'react';

interface Props {
  classes: { [key: string]: string };
  highlighted?: boolean;
  pl?: boolean;
  value: number;
}

const Percent: React.FunctionComponent<Props> = ({
  classes, highlighted, pl, value,
}: Props) => {
  let className;

  if (pl) {
    if (value === 0) {
      className = classes.neutral;
    } else {
      className = value > 0 ? classes.positive : classes.negative;
    }
  }

  const content = `${(value * 100).toFixed(2)}%`;

  if (highlighted) {
    return <strong className={className}>{content}</strong>;
  }

  return <span className={className}>{content}</span>;
};

Percent.defaultProps = {
  highlighted: undefined,
  pl: undefined,
};

export default Percent;
