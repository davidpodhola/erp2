import React from 'react';
import { act, render, wait, screen, waitFor } from '@testing-library/react';
import ServerTime, { SERVER_TIME } from './server.time';
import { MockedProvider } from '@apollo/client/testing';
import { SERVER_TIME_MOCK_NOW, SERVER_TIME_MOCKS } from './server.time.mocks';

describe(' Server Time', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider mocks={SERVER_TIME_MOCKS} addTypename={false}>
        <ServerTime />
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should display the value', async () => {
    const { getByText } = render(
      <MockedProvider mocks={SERVER_TIME_MOCKS} addTypename={false}>
        <ServerTime />
      </MockedProvider>
    );

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    ); // wait for response
    await expect(
      getByText(
        new Date(SERVER_TIME_MOCK_NOW).toString()
      )
    ).toBeTruthy();
  });
});
