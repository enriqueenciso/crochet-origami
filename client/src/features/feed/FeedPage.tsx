import { Post } from '@crochet/shared';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PostList from './PostList';

const mockPosts: Post[] = [
  {
    id: '1',
    section: 'crochet',
    title: 'Dummy Crochet 1',
    excerpt: '',
  },
  {
    id: '2',
    section: 'origami',
    title: 'Dummy Origami 1',
    excerpt: '',
  },
  {
    id: '3',
    section: 'origami',
    title: 'Dummy Origami 2',
    excerpt: '',
  },
  {
    id: '4',
    section: 'crochet',
    title: 'Dummy Crochet 1',
    excerpt: '',
  },
];

type filterStates = 'all' | 'crochet' | 'origami';

export function FeedPage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<filterStates>('all');

  const filteredPosts =
    activeFilter === 'all' ? mockPosts : mockPosts.filter((post) => post.section === activeFilter);

  return (
    <>
      <div className="filter-button__container">
        <button
          className={`px-4 py-2 rounded border cursor-pointer ${activeFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
          onClick={() => setActiveFilter('all')}
        >
          {t('feed.filter.all')}
        </button>
        <button
          className={`px-4 py-2 rounded border cursor-pointer ${activeFilter === 'crochet' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
          onClick={() => setActiveFilter('crochet')}
        >
          {t('feed.filter.crochet')}
        </button>
        <button
          className={`px-4 py-2 rounded border cursor-pointer ${activeFilter === 'origami' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
          onClick={() => setActiveFilter('origami')}
        >
          {t('feed.filter.origami')}
        </button>
      </div>
      <PostList posts={filteredPosts} />
    </>
  );
}
