import { Post } from '@crochet/shared';
import PostCard from './PostCard';

function PostList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}

export default PostList;
