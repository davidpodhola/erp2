import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { CustomersPage, HomePage, ServerTime, Ui } from '@erp2/ui';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { auth } from '../../../mobile/src/client';
import { Header } from '@erp2/ui';

export const App = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  // if (!isAuthenticated) loginWithRedirect();
  const [token, setToken] = useState<string>(null);
  if ((window as any).Cypress) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const auth0 = JSON.parse(localStorage.getItem("auth0Cypress")!);
      if (auth0) {
        setToken(auth0.access_token);
        auth.token = auth0.access_token;
      }
    }, []);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const setTokenIfAuthenticated = async () => {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          setToken(token);
          auth.token = token;
        }
      };

      setTokenIfAuthenticated().then();
    }, [isAuthenticated, getAccessTokenSilently]);
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Web App
        </Typography>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/customers" component={CustomersPage} />
          </Switch>
        </div>
        <div>
          <Ui />
          {token ? (
            <div>
              <span>Token: ${token}</span>
              <ServerTime />
            </div>
          ) : (
            <Button
              color={'primary'}
              variant={'contained'}
              size={'large'}
              onClick={() => loginWithRedirect()}
              data-testid={"login-button"}
            >
              Login...
            </Button>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default App;
