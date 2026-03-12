import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

/* ── helpers ── */
const AVATAR_COLORS = ['#2f74ff', '#7c3aed', '#0891b2', '#059669', '#d97706', '#be185d'];

function avatarColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function getInitials(name = '') {
  return name.split(/\s+/).map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function AuthorChip({ author }) {
  const name = author.name || author.key || 'Unknown';
  const inner = (
    <>
      {author.imageURL ? (
        <img src={author.imageURL} alt={name} className="blog-author-avatar" />
      ) : (
        <span
          className="blog-author-avatar blog-author-initials"
          style={{ background: avatarColor(name) }}
          aria-hidden="true"
        >
          {getInitials(name)}
        </span>
      )}
      <span className="blog-author-name">{name}</span>
    </>
  );

  return author.url ? (
    <a
      href={author.url}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-author-chip"
      title={name}
    >
      {inner}
    </a>
  ) : (
    <span className="blog-author-chip">{inner}</span>
  );
}

/* ── main component ── */
export default function BlogPostItem({ children, className }) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { permalink, title, date, tags, authors, frontMatter } = metadata;

  const rawImage = frontMatter.image || frontMatter.cover;
  const image = useBaseUrl(rawImage);
  const category = frontMatter.category;

  /* detail page */
  if (isBlogPostPage) {
    return (
      <BlogPostItemContainer className={clsx('blog-post-item-detail', className)}>
        <BlogPostItemHeader />
        <BlogPostItemContent>{children}</BlogPostItemContent>
        <BlogPostItemFooter />
      </BlogPostItemContainer>
    );
  }

  /* list card */
  return (
    <BlogPostItemContainer className={clsx('blog-card', className)}>

      {/* Left: cover image */}
      <Link to={permalink} className="blog-card-img-wrap" tabIndex={-1} aria-hidden="true">
        {image ? (
          <img src={image} alt={title} className="blog-card-img" loading="lazy" />
        ) : (
          <div className="blog-card-img-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </Link>

      {/* Right: content */}
      <div className="blog-card-body">

        {/* Category badge */}
        {category && (
          <span className={clsx('blog-card-cat', `blog-card-cat--${category.toLowerCase()}`)}>
            {category}
          </span>
        )}

        {/* Title */}
        <h2 className="blog-card-title">
          <Link to={permalink}>{title}</Link>
        </h2>

        {/* Date */}
        <div className="blog-card-date">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formatDate(date)}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="blog-card-tags">
            {tags.slice(0, 4).map(tag => (
              <Link key={tag.label} to={tag.permalink} className="blog-tag-pill">
                {tag.label}
              </Link>
            ))}
            {tags.length > 4 && (
              <span className="blog-tag-more">+{tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Authors */}
        {authors && authors.length > 0 && (
          <div className="blog-card-authors">
            {authors.map((author, i) => (
              <AuthorChip key={i} author={author} />
            ))}
          </div>
        )}
      </div>
    </BlogPostItemContainer>
  );
}
