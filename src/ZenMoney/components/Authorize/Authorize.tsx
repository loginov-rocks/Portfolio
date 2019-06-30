import * as React from 'react';

interface Props {
  handleAuthorize: () => void;
  progress: boolean;
}

const Authorize = ({ handleAuthorize, progress }: Props) => (
  <div>
    {progress
      ? <span>Progress...</span>
      : <button onClick={handleAuthorize} type="button">Sign in</button>}
  </div>
);

export default Authorize;
