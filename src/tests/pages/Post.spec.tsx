import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/client');

jest.mock('../../services/prismic');

const post = { slug: 'new-post', title: 'New Post', content: '<p>Post content</p>', updatedAt: '2021-08-07' };

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);
    
    expect(screen.getByText('New Post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
  });
  
  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockReturnValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: 'new-post' }
    } as any);
    
    expect(response).toEqual(expect.objectContaining({
      redirect: expect.objectContaining({ destination: '/' })
    }));
  });
  
  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getSessionMocked.mockReturnValueOnce({ activeSubscription: 'fake' } as any);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'New Post' }],
          content: [{ type: 'paragraph', text: 'Post content' }]
        },
        last_publication_date: '2021-08-07'
      })
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'new-post' }
    } as any);
    
    expect(response).toEqual(expect.objectContaining({
      props: {
        post: { slug: 'new-post', title: 'New Post', content: '<p>Post content</p>', updatedAt: '06 de agosto de 2021' }
      }
    }));
  });
});
