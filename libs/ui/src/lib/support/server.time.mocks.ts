import { SERVER_TIME } from './server.time';

export const SERVER_TIME_MOCK_NOW = 1595875906557;

export const SERVER_TIME_MOCKS = [
  {
    request: {
      query: SERVER_TIME,
    },
    result: {
      data: {
        now: SERVER_TIME_MOCK_NOW,
      },
    },
  },
];
