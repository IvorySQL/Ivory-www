import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import EditThisPage from '@theme/EditThisPage';

export default function BlogPostItemFooter() {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {tags, editUrl} = metadata;

  if (!isBlogPostPage) {
    return null;
  }

  return (
    <footer className="row docusaurus-mt-lg">
      {tags.length > 0 && (
        <div className="col">
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
            {tags.map(({label}) => (
              <span key={label} className="tag-pill-static">
                {label}
              </span>
            ))}
          </div>
        </div>
      )}
      {editUrl && (
        <div className="col margin-top--sm">
          <EditThisPage editUrl={editUrl} />
        </div>
      )}
    </footer>
  );
}