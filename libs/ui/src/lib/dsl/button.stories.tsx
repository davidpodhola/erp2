import React from 'react';
import { Button } from './button';
import { ClrLoadingState } from '@clr/core/button';

export default {
  component: Button,
  title: 'Button',
};

export const solidPrimaryMd = () => {
  return <Button action={'solid'} status={'primary'} block={false} loadingState={ClrLoadingState.DEFAULT} size={'md'} title={'solid primary md'} />;
};

export const outlineDangerSm = () => {
  return <Button action={'outline'} status={'danger'} block={false} loadingState={ClrLoadingState.DEFAULT} size={'sm'} title={'outline danger sm'} />;
};
