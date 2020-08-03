import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import '@clr/core/global.css';
import { GlobalStyles } from '../src/styles';

addDecorator(withKnobs);
addDecorator((story) => (
  <>
    <GlobalStyles />
    {story()}
  </>
));
configure(require.context('../src/lib', true, /\.stories\.(j|t)sx?$/), module);
