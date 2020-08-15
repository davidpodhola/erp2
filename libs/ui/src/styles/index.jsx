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
