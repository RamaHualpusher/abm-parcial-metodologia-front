import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import DeleteModal from '.';

describe('DeleteModal', () => {
  test('should render', () => {
    const props = {
      message: 'This is my test message',
      onCancel: () => { },
      onOk: () => { },
      title: 'This is my test title',
    };

    render(<DeleteModal {...props} />);

    expect(screen.getByText('This is my test message')).toBeDefined();
  });
});
