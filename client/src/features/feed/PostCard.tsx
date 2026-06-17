import { Post } from '@crochet/shared';
import { useTranslation } from 'react-i18next';

function PostCard({ post }: { post: Post }) {
  const { t } = useTranslation();
  return (
    <div>
      {post.title}
      <span>{t(`feed.filter.${post.section}`)}</span>
      {post.excerpt}
    </div>
  );
}

export default PostCard;
