import React from 'react';
import { CdsButton } from '@clr/react/button';

/* eslint-disable-next-line */
export interface UiProps {}

export const Ui = (props: UiProps) => {
  return (
    <div>
      <h1>Welcome to ui!</h1>
      <CdsButton>Hello!</CdsButton>
    </div>
  );
};

export default Ui;
