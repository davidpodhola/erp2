import React from 'react';
import { Card, CardProps } from './card';
import { CardBlock } from './cardBlock';
import { Button } from './button';
import { ClrLoadingState } from '@clr/core/button';

export default {
  component: Card,
  title: 'Card',
};

export const card = (args: CardProps) => (
  <Card
    {...args}
    footerActions={[
      <Button
        action={'flat'}
        status={'primary'}
        size={'sm'}
        block={false}
        loadingState={ClrLoadingState.DEFAULT}
        title={'Sample action 1'}
      />,
      <Button
        action={'flat'}
        status={'primary'}
        size={'sm'}
        block={false}
        loadingState={ClrLoadingState.DEFAULT}
        title={'Sample action 2'}
      />,
    ]}
  >
    <CardBlock title={'sample card block 1'}>Sample card 1 content</CardBlock>
    <CardBlock title={'sample card block 2'}>
      <p>Sample card 2 content</p>
      <Button action={'solid'} status={'danger'} size={'md'} block={false} loadingState={ClrLoadingState.DEFAULT} title={'Test button'} />
    </CardBlock>
  </Card>
);
