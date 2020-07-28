import React from 'react';
import { render } from '@testing-library/react';

import App from './app';
import { MockedProvider } from '@apollo/client/testing';
import { SERVER_TIME_MOCKS } from '../../../../libs/ui/src/lib/support/server.time.spec';

const mocks = [...SERVER_TIME_MOCKS];

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider mocks={mocks}  addTypename={false}>
        <App/>
      </MockedProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App/>
      </MockedProvider>
    );

    expect(getByText('Welcome to web!')).toBeTruthy();
  });
});
