import { Avatar, Typography } from '@material-ui/core';
import * as React from 'react';

import {
  ResetVibrantPalettesAction,
} from 'Layers/Application/ActionCreators/FirebaseActionCreators/FirebaseActionCreators';
import {
  ResetLogosAction, ResetQuotesAction,
} from 'Layers/Application/ActionCreators/StocksActionCreators/StocksActionCreators';
import { ProfileState } from 'Layers/Application/States/FirebaseState/FirebaseState';
import { LogoutButton } from 'Layers/Presentation/Components/LogoutButton';

interface Props {
  classes: { [key: string]: string };
  profile: ProfileState;
  resetLogos: ResetLogosAction;
  resetQuotes: ResetQuotesAction;
  resetVibrantPalettes: ResetVibrantPalettesAction;
}

const Profile: React.FunctionComponent<Props> = ({
  classes, profile, resetLogos, resetQuotes, resetVibrantPalettes,
}: Props) => (
  <div className={classes.root}>

    <Typography className={classes.headline} variant="h4">Profile</Typography>

    {profile.avatarUrl && (
      // TODO: rel="no-referrer" should be passed to the Image object created in background to download the image and
      //  avoid 403. Pending fix from the Material UI library.
      <Avatar className={classes.avatar} src={profile.avatarUrl} />
    )}

    {profile.displayName && (
      <Typography variant="h6">{profile.displayName}</Typography>
    )}

    {profile.email && (
      <Typography>{profile.email}</Typography>
    )}

    <LogoutButton
      className={classes.signOut}
      onLogout={() => {
        resetLogos();
        resetQuotes();
        resetVibrantPalettes();
      }}
    >
      Sign Out
    </LogoutButton>

  </div>
);

export default Profile;
