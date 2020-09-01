import React, { useEffect, useState } from 'react';

import { Ui, ServerTime } from '@erp2/ui';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Box, Typography, Button } from '@material-ui/core';
import { auth } from '../../../../shared/ui-shared/src';

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
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        setToken(token);
        auth.token = token;
      }
    };

    setTokenIfAuthenticated().then();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Web App
        </Typography>

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
