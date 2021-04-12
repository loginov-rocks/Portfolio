import * as React from 'react';

import { Logo } from 'Layers/Presentation/Logo';
import GoogleLoginButton from 'User/components/GoogleLoginButton';

interface Props {
  classes: { [key: string]: string };
}

export const Guest: React.FunctionComponent<Props> = ({ classes }: Props) => (
  <div className={classes.root}>

    <Logo className={classes.headline} />

    <GoogleLoginButton />

  </div>
);
