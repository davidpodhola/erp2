import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
