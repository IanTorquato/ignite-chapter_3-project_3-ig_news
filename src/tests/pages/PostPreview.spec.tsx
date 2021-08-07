import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/client');
jest.mock('next/router');

jest.mock('../../services/prismic');

const post = { slug: 'new-post', title: 'New Post', content: '<p>Post content</p>', updatedAt: '2021-08-07' };

describe('PostPreview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<PostPreview post={post} />);
    
    expect(screen.getByText('New Post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });
  
  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([{ activeSubscription: 'fake' }, false]);
    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<PostPreview post={post} />);
    
    expect(pushMock).toBeCalledWith('/posts/new-post');
  });
  
  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'New Post' }],
          content: [{ type: 'paragraph', text: 'Post content' }]
        },
        last_publication_date: '2021-08-07'
      })
    } as any);

    const response = await getStaticProps({
      params: { slug: 'new-post' }
    } as any);
    
    expect(response).toEqual(expect.objectContaining({
      props: {
        post: { slug: 'new-post', title: 'New Post', content: '<p>Post content</p>', updatedAt: '06 de agosto de 2021' }
      }
    }));
  });
});
