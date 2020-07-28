import React from 'react';
import { ServerTime } from './server.time';

export default {
  component: ServerTime,
  title: 'Server Time',
};

export const primary = () => {
  return <ServerTime />;
};
