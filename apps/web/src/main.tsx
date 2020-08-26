import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client, theme } from '@erp2/ui-shared';
import { GlobalStyles } from '@erp2/ui';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.NX_AUTH0_DOMAIN}
        clientId={process.env.NX_AUTH0_CLIENTID}
        audience={process.env.NX_AUTH0_AUDIENCE}
        redirectUri={'http://localhost:4200'}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <App />
        </ThemeProvider>
      </Auth0Provider>
      <GlobalStyles />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
