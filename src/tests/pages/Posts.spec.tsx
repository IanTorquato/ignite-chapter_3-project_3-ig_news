import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');

const posts = [{ slug: 'new-post', title: 'New Post', excerpt: 'Post excerpt', updatedAt: '2021-08-07' }];

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);
    
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });
  
  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [{
          uid: 'new-post',
          data: {
            title: [{ type: 'heading', text: 'New Post' }],
            content: [{ type: 'paragraph', text: 'Post excerpt' }]
          },
          last_publication_date: '2021-08-07'
        }]
      })
    } as any);

    const response = await getStaticProps({});
    
    expect(response).toEqual(expect.objectContaining({ props: {
      posts: [{ slug: 'new-post', title: 'New Post', excerpt: 'Post excerpt', updatedAt: '06 de agosto de 2021' }]
    } }));
  });
});
