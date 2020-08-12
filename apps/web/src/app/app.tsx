import React, { useEffect, useState } from 'react';

import { Ui, ServerTime } from '@erp2/ui';
import { useAuth0 } from '@auth0/auth0-react';

export const App = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  // if (!isAuthenticated) loginWithRedirect();
  const [token, setToken] = useState<string>(null);
  useEffect(() => {
    const setTokenIfAuthenticated = async () => {
      if (isAuthenticated) setToken(await getAccessTokenSilently());
    };

    setTokenIfAuthenticated().then();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    /*(isLoading || !isAuthenticated ) ? (<div>Loading...</div>) :*/ <div className="main-container">
      <div className="alert alert-app-level">Alert</div>
      <header className="header header-6">Header</header>
      <nav className="subnav">subnav</nav>
      <div className="content-container">
        <div className="content-area">
          <Ui />
          <ServerTime />
          {token ? (
            <span>Token: ${token}</span>
          ) : (
            <div onClick={() => loginWithRedirect()}>Login...</div>
          )}
        </div>
        <nav className="sidenav">sidenav</nav>
      </div>
    </div>
  );
};

export default App;
