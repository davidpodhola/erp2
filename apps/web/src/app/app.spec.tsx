import React from 'react';
import { render } from '@testing-library/react';

import App from './app';
import { MockedProvider } from '@apollo/client/testing';
import { mocks } from '@erp2/ui';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(getByText('Header')).toBeTruthy();
  });
});
