import * as React from 'react';

// TODO: Tests.

interface Props {
  pl?: boolean;
  value: number;
}

const Percent: React.FunctionComponent<Props> = ({ pl, value }: Props) => {
  const style: React.CSSProperties = {};

  if (pl) {
    if (value === 0) {
      style.color = 'gray';
    } else {
      style.color = value > 0 ? 'green' : 'red';
    }
  }

  return (
    <span style={style}>
      {(value * 100).toFixed(2)}
      %
    </span>
  );
};

export default Percent;
