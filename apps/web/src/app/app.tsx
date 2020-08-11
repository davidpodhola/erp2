import React from 'react';

import { Ui, ServerTime } from '@erp2/ui';
import { useAuth0 } from '@auth0/auth0-react';

export const App = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  // if (!isAuthenticated) loginWithRedirect();

  return /*(isLoading || !isAuthenticated ) ? (<div>Loading...</div>) :*/ (
    <div className="main-container">
      <div className="alert alert-app-level">Alert</div>
      <header className="header header-6">Header</header>
      <nav className="subnav">subnav</nav>
      <div className="content-container">
        <div className="content-area">
          <Ui />
          <ServerTime />
          <div
            onClick={() => loginWithRedirect()}
          >Login...</div>
        </div>
        <nav className="sidenav">sidenav</nav>
      </div>
    </div>
  );
};

export default App;
