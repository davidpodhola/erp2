import React from 'react';
import { render } from '@testing-library/react';

import UiMobile from './ui-mobile';

describe(' UiMobile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMobile />);
    expect(baseElement).toBeTruthy();
  });
});
