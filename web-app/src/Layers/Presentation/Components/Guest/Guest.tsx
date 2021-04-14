import * as React from 'react';

import { GoogleLoginButton } from 'Layers/Presentation/Components/GoogleLoginButton';
import { Logo } from 'Layers/Presentation/Components/Logo';

interface Props {
  classes: { [key: string]: string };
}

export const Guest: React.FunctionComponent<Props> = ({ classes }: Props) => (
  <div className={classes.root}>

    <Logo className={classes.headline} />

    <GoogleLoginButton />

  </div>
);
