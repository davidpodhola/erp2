import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button  } from '@material-ui/core';

export default {
  component: Button,
  title: 'Material-UI/Button',
  argTypes: {
    title: { control: 'text' },
    color: {
      control: {
        type: 'inline-radio',
        options: ['default' , 'inherit' , 'primary', 'secondary'],
      },
    },
    size: {
      control: {
        type: 'inline-radio',
        options: ['large' , 'medium' , 'small'],
      },
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['contained' , 'outlined' , 'text'],
      },
    }
  },
};

export const button = (args) => (
  <Button {...args} onclick={action('clicked')}>{args.title}</Button>
);
