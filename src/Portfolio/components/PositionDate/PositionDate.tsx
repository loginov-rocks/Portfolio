import * as React from 'react';

// TODO: Tests.

interface Props {
  date: string;
}

const PositionDate: React.FunctionComponent<Props> = ({ date }: Props) => (
  <span>{new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
);

export default PositionDate;
