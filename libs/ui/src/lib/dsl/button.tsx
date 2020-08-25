import React, { FC } from 'react';
import { CdsButton } from '@clr/react/button';
import { ButtonProps } from '@erp2/ui-shared';
import { ClrLoadingState } from '@clr/core/button';

const convertLoadingState = (loadingState: 'default' | 'loading' | 'success' | 'error'): ClrLoadingState => {
  switch (loadingState) {
    case 'default': return ClrLoadingState.DEFAULT;
    case 'loading': return ClrLoadingState.LOADING;
    case 'success': return ClrLoadingState.SUCCESS;
    case 'error': return ClrLoadingState.ERROR;
  }
}

const keepProps = (props: ButtonProps) => (
  {
    action: props.action,
    status: props.status,
    size: props.size,
    block: props.block,
    disabled: props.disabled,
    onclick: props.onclick,
  }
)

const convertProps = (props: ButtonProps) => (
  {
    loadingState: convertLoadingState(props.loadingState),
    ...keepProps(props)
  }
)


export const Button: FC<ButtonProps> = (props: ButtonProps) => (
  <CdsButton {...convertProps(props)}>{props.title}</CdsButton>
);
