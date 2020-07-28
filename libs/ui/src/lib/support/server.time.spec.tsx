import React from 'react';
import { act, render, wait, screen, waitFor } from '@testing-library/react';
import ServerTime, { SERVER_TIME } from './server.time';
import { MockedProvider } from '@apollo/client/testing';

export const SERVER_TIME_MOCKS = [
  {
    request: {
      query: SERVER_TIME,
    },
    result: {
      data: {
        now: 1595875906557
      },
    },
  },
];


describe(' Server Time', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider mocks={SERVER_TIME_MOCKS} addTypename={false}>
        <ServerTime/>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should display the value', async () => {
    const { getByText } = render(
      <MockedProvider mocks={SERVER_TIME_MOCKS} addTypename={false}>
        <ServerTime/>
      </MockedProvider>
    );

    await act(async () =>await new Promise(resolve => setTimeout(resolve, 0))); // wait for response
    await expect(getByText('Mon Jul 27 2020 20:51:46 GMT+0200 (Central European Summer Time)')).toBeTruthy();
  });

});
