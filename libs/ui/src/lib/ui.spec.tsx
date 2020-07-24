import React from 'react';
import { render } from '@testing-library/react';

import Ui from './ui';

describe(' Ui', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Ui />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<Ui />);

    expect(getByText('Welcome to ui!')).toBeTruthy();
  });

});
