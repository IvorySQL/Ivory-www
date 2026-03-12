import React from 'react';
import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import EditThisPage from '@theme/EditThisPage';

export default function BlogPostItemFooter() {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { tags, editUrl } = metadata;

  if (!isBlogPostPage) return null;

  return (
    <footer className="blog-post-footer">
      {tags.length > 0 && (
        <div className="blog-post-footer-tags">
          <span className="blog-post-footer-tags-label">Tags:</span>
          <div className="blog-post-footer-tags-list">
            {tags.map(({ label, permalink }) => (
              <Link key={label} to={permalink} className="blog-tag-pill">
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
      {editUrl && (
        <div className="blog-post-footer-edit">
          <EditThisPage editUrl={editUrl} />
        </div>
      )}
    </footer>
  );
}
