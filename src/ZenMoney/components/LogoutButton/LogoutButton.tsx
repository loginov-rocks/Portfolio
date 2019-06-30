import * as React from 'react';

interface Props {
  children: JSX.Element;
  handleClick: () => void;
}

const LogoutButton = ({ handleClick }: Props) => (
  <button onClick={handleClick} type="button">Logout</button>
);

export default LogoutButton;
