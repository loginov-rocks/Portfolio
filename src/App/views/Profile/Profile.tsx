import * as React from 'react';

import LogoutButton from 'User/components/LogoutButton';

const Profile = ({ handleHomeClick, profile }) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick}>Home</button>
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
