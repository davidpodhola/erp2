import React from 'react';
import { Button} from './button';
import { action } from '@storybook/addon-actions';
import { ButtonProps } from '@erp2/ui-shared';

export default {
  component: Button,
  title: 'Button',
  argTypes: {
    title: { control: 'text' },
    action: {
      control: {
        type: 'inline-radio',
        options: ['solid' , 'outline' , 'flat'],
      },
    },
    status: {
      control: {
        type: 'inline-radio',
        options: ['primary' , 'success' , 'danger' , 'inverse'],
      },
    }
  },
};

export const button = (args: ButtonProps) => (
  <Button {...args} onclick={action('clicked')} />
);

export const primarySolidMdButton = (args: ButtonProps) => (
  <Button
    action={'solid'}
    status={'primary'}
    block={false}
    loadingState={'default'}
    size={'md'}
    title={'solid primary md'}
    {...args}
    onclick={action('clicked')}
  />
);
