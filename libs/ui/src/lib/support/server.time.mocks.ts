import { SERVER_TIME } from './server.time';

export const SERVER_TIME_MOCKS = [
  {
    request: {
      query: SERVER_TIME,
    },
    result: {
      data: {
        now: 1595875906557,
      },
    },
  },
];
