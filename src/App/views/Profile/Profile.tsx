import { Avatar, Typography } from '@material-ui/core';
import * as React from 'react';

import { ProfileState } from 'Firebase/State';
import { ResetLogosAction, ResetQuotesAction } from 'Stocks/actions';
import LogoutButton from 'User/components/LogoutButton';

interface Props {
  classes: { [key: string]: string };
  profile: ProfileState;
  resetLogos: ResetLogosAction;
  resetQuotes: ResetQuotesAction;
}

const Profile: React.FunctionComponent<Props> = ({
  classes, profile, resetLogos, resetQuotes,
}: Props) => (
  <div className={classes.root}>

    <Typography className={classes.headline} variant="h4">Profile</Typography>

    {profile.avatarUrl && (
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
      }}
    >
      Sign Out
    </LogoutButton>

  </div>
);

export default Profile;
