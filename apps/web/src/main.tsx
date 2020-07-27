import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
