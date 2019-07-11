import * as React from 'react';

import GoogleLoginButton from 'User/components/GoogleLoginButton';

import Logo from '../../components/Logo';

interface Props {
  classes: { [key: string]: string };
}

const Guest: React.FunctionComponent<Props> = ({ classes }: Props) => (
  <div className={classes.root}>

    <div className={classes.row}>
      <Logo />
    </div>

    <div className={classes.row}>
      <GoogleLoginButton />
    </div>

  </div>
);

export default Guest;
