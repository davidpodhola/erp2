import React from 'react';
import { Button, ButtonProps } from './button';
import { action } from '@storybook/addon-actions';
import { ClrLoadingState } from '@clr/core/button';

export default {
  component: Button,
  title: 'Button',
};

export const button = (args: ButtonProps) =>
  <Button
    {...args}
    onclick={action('clicked')}
  />


export const primarySolidMdButton = (args: ButtonProps) =>
  <Button
    action={'solid'} status={'primary'} block={false} loadingState={ClrLoadingState.DEFAULT} size={'md'} title={'solid primary md'} {...args}
    onclick={action('clicked')}
  />
