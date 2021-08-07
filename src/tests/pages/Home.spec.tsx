import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next/router');

jest.mock('next-auth/client', () => ({
  useSession: () => [null, false]
}));

jest.mock('../../services/stripe');

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home product={{ priceId: '1', amount: 'R$16,00' }} />);
    
    expect(screen.getByText('for R$16,00 month')).toBeInTheDocument();
  });
  
  it('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake',
      unit_amount: 1000
    } as any);

    const response = await getStaticProps({});
    
    expect(response).toEqual(expect.objectContaining({ props: { product: { priceId: 'fake', amount: '$10.00' } } }));
  });
});
