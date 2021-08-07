import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

it('rendes correctly', async () => {
  render(<Async />);

  expect(screen.getByText('Hello Ignite')).toBeInTheDocument();

  // await waitFor(() => expect(screen.queryByText('Button')).not.toBeInTheDocument());
  /* OR */
  await waitForElementToBeRemoved(screen.queryByText('Button'));
});
