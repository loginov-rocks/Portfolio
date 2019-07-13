import { Avatar, Typography } from '@material-ui/core';
import * as React from 'react';

import { ProfileState } from 'Firebase/State';
import LogoutButton from 'User/components/LogoutButton';

interface Props {
  classes: { [key: string]: string };
  profile: ProfileState;
}

const Profile: React.FunctionComponent<Props> = ({ classes, profile }: Props) => (
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

    <LogoutButton className={classes.signOut}>Sign Out</LogoutButton>

  </div>
);

export default Profile;
