/**
 * The global styles definitions
 *
 * Please note this file must stay as .jsx. Do not rename to .tsx,
 * because it is used by the storybook.
 *
 * */

import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

const BasicStyles = createGlobalStyle`
`;

export const GlobalStyles = () => (
  <>
    <Normalize />
    <BasicStyles />
  </>
);
