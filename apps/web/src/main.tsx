import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { GlobalStyles } from '@erp2/ui';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '@erp2/ui';
import { client } from '../../mobile/src/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
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
  </ApolloProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
