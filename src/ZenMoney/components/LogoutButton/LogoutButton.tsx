import * as React from 'react';

interface Props {
  handleClick: () => void;
}

const LogoutButton: React.FunctionComponent<Props> = ({ handleClick }: Props) => (
  <button onClick={handleClick} type="button">Logout</button>
);

export default LogoutButton;
