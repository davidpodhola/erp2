import React from 'react';
import { render } from '@testing-library/react';

import App from './app';
import { MockedProvider } from '@apollo/client/testing';
import { mocks } from '@erp2/ui';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
      </MemoryRouter>
    );

    expect(getByText('Web App')).toBeTruthy();
  });
});
