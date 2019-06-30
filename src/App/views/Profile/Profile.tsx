import * as React from 'react';

import LogoutButton from 'User/components/LogoutButton';

interface Props {
  handleHomeClick: () => void;
  profile: {
    avatarUrl: string;
    displayName: string;
    email: string;
  };
}

const Profile = ({ handleHomeClick, profile }: Props) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick} type="button">Home</button>
    </div>

    <h1>Profile</h1>

    <div>

      {profile.avatarUrl && (
        <img align="right" alt="Avatar" src={profile.avatarUrl} />
      )}

      {profile.displayName && (
        <strong>{profile.displayName}</strong>
      )}

      {profile.email && (
        <em>{profile.email}</em>
      )}

    </div>

    <div>
      <LogoutButton>Logout</LogoutButton>
    </div>

  </React.Fragment>
);

export default Profile;
