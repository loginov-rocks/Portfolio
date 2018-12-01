/* @flow */

import * as React from 'react';

const Home = ({ handleCreatePositionClick, handleProfileClick }) => (
  <React.Fragment>

    <h1>Home</h1>

    <div>
      <button onClick={handleCreatePositionClick}>Create position</button>
      <button onClick={handleProfileClick}>Profile</button>
    </div>

  </React.Fragment>
);

export default Home;
