import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItem(props) {
  const {children, className} = props;
  const {metadata, isBlogPostPage} = useBlogPost();
  const {permalink, title, date, tags, frontMatter} = metadata;
  
  const rawImage = frontMatter.image || frontMatter.cover;
  const image = useBaseUrl(rawImage);

  if (isBlogPostPage) {
    return (
      <BlogPostItemContainer className={clsx('blog-post-item-detail', className)}>
        <BlogPostItemHeader />
        <BlogPostItemContent>{children}</BlogPostItemContent>
        <BlogPostItemFooter />
      </BlogPostItemContainer>
    );
  }

  return (
    <BlogPostItemContainer className={clsx('custom-horizontal-card', className)}>
      <div className="card-left-img">
        <Link to={permalink}>
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="placeholder-text">IvorySQL</div>
          )}
        </Link>
      </div>

      <div className="card-right-content">
        <h2 className="post-item-title">
          <Link to={permalink}>{title}</Link>
        </h2>
        <div className="post-item-date">{date.split('T')[0]}</div>
        <div className="post-item-tags">
          <div className="tags-list">
            {tags.map((tag) => (
              <span key={tag.label} className="tag-pill-static">{tag.label}</span>
            ))}
          </div>
        </div>
      </div>
    </BlogPostItemContainer>
  );
}