import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { GlobalStyles } from '@erp2/ui';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
      <GlobalStyles />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
