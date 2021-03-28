import * as React from 'react';

import GoogleLoginButton from 'User/components/GoogleLoginButton';

import Logo from '../../components/Logo';

interface Props {
  classes: { [key: string]: string };
}

const Guest: React.FunctionComponent<Props> = ({ classes }: Props) => (
  <div className={classes.root}>

    <Logo className={classes.headline} />

    <GoogleLoginButton />

  </div>
);

export default Guest;
