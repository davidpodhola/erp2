import React from 'react';
import { ServerTime } from './server.time';
import { SERVER_TIME_MOCKS } from './server.time.mocks';
import { MockedProvider } from '@apollo/client/testing';

export default {
  component: ServerTime,
  title: 'Server Time',
};

export const primary = () => {
  return (
    <MockedProvider mocks={SERVER_TIME_MOCKS} addTypename={false}>
      <ServerTime />
    </MockedProvider>
  );
};
