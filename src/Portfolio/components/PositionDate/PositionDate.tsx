import * as React from 'react';

interface Props {
  highlighted?: boolean;
  date: string;
}

const PositionDate: React.FunctionComponent<Props> = ({ highlighted, date }: Props) => {
  const content = new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  if (highlighted) {
    return <strong>{content}</strong>;
  }

  return <span>{content}</span>;
};

export default PositionDate;
