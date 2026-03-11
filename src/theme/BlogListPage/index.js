import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItems from '@theme/BlogPostItems';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const POSTS_PER_PAGE = 9;

const CATEGORIES = [
  { key: null,         labelEn: 'All Posts',   labelZh: '全部' },
  { key: 'IvorySQL',   labelEn: 'IvorySQL',    labelZh: 'IvorySQL' },
  { key: 'PostgreSQL', labelEn: 'PostgreSQL',   labelZh: 'PostgreSQL' },
];

export default function BlogListPage({ items, sidebar }) {
  const { i18n } = useDocusaurusContext();
  const isEn = i18n.currentLocale === 'en';
  const location = useLocation();
  const currentCat = new URLSearchParams(location.search).get('cat');

  const [selectedTag, setSelectedTag] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSelectedTag(null);
    setPage(1);
  }, [currentCat]);

  // collect tags within current category
  const allTags = useMemo(() => {
    const map = {};
    const source = currentCat
      ? (items || []).filter(i => i.content.frontMatter?.category === currentCat)
      : (items || []);
    source.forEach(({ content }) => {
      (content.metadata?.tags || []).forEach(tag => {
        if (!map[tag.label]) map[tag.label] = { ...tag, count: 0 };
        map[tag.label].count++;
      });
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [items, currentCat]);

  const filtered = useMemo(() => {
    let result = items || [];
    if (currentCat) {
      result = result.filter(i => i.content.frontMatter?.category === currentCat);
    }
    if (selectedTag) {
      result = result.filter(i =>
        (i.content.metadata?.tags || []).some(t => t.label === selectedTag)
      );
    }
    return result;
  }, [items, currentCat, selectedTag]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleTagClick = (label) => {
    setSelectedTag(prev => prev === label ? null : label);
    setPage(1);
  };

  const handlePageChange = (p) => {
    setPage(p);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Right sidebar: tag list ── */
  const TagSidebar = (
    <aside className="blog-tag-sidebar">
      <div className="blog-tag-sidebar-header">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span>{isEn ? 'Filter by Tag' : '按标签筛选'}</span>
      </div>

      {allTags.length > 0 ? (
        <ul className="blog-tag-sidebar-list">
          {allTags.map(tag => (
            <li key={tag.label}>
              <button
                className={clsx('blog-tag-sidebar-item', selectedTag === tag.label && 'active')}
                onClick={() => handleTagClick(tag.label)}
                aria-pressed={selectedTag === tag.label}
              >
                <span className="blog-tag-sidebar-label">{tag.label}</span>
                <span className="blog-tag-sidebar-count">{tag.count}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="blog-tag-sidebar-empty">{isEn ? 'No tags found.' : '暂无标签'}</p>
      )}

      {selectedTag && (
        <button className="blog-tag-sidebar-clear" onClick={() => handleTagClick(selectedTag)}>
          {isEn ? '✕ Clear filter' : '✕ 清除筛选'}
        </button>
      )}
    </aside>
  );

  return (
    <BlogLayout sidebar={sidebar}>

      {/* ── Page header ── */}
      <div className="blog-page-header">
        <div className="blog-page-header-inner">
          <h1 className="blog-page-title">
            {isEn ? 'Blog' : '博客'}
          </h1>
          <p className="blog-page-subtitle">
            {isEn
              ? 'Insights, tutorials, and updates from the IvorySQL team'
              : '来自 IvorySQL 团队的见解、教程与最新动态'}
          </p>
        </div>
        <span className="blog-page-count-badge">
          {(items || []).length} {isEn ? 'Posts' : '篇'}
        </span>
      </div>

      {/* ── Category tabs ── */}
      <div className="blog-filter-bar">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.key ?? 'all'}
            to={cat.key ? `/blog?cat=${cat.key}` : '/blog'}
            className={clsx('blog-cat-btn', currentCat === cat.key && 'active')}
          >
            {isEn ? cat.labelEn : cat.labelZh}
          </Link>
        ))}
      </div>

      {/* ── Two-column layout ── */}
      <div className="blog-body-layout">

        {/* ── Left: posts ── */}
        <div className="blog-main-col">

          {/* Results info */}
          <div className="blog-results-bar">
            <span className="blog-results-text">
              {filtered.length} {isEn ? 'posts' : '篇文章'}
              {selectedTag && (
                <>
                  &nbsp;·&nbsp;
                  <span className="blog-results-tag-label">#{selectedTag}</span>
                </>
              )}
            </span>
            {totalPages > 1 && (
              <span className="blog-results-page">
                {isEn ? `Page ${page} / ${totalPages}` : `第 ${page} / ${totalPages} 页`}
              </span>
            )}
          </div>

          {/* Post list */}
          {paged.length > 0 ? (
            <BlogPostItems items={paged} />
          ) : (
            <div className="blog-empty-state">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#cbd5e1" strokeWidth="1.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>{isEn ? 'No posts found.' : '暂无文章。'}</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="blog-pagination-wrapper">
              <div className="blog-pagination">
                <button
                  className={clsx('blog-page-nav', page === 1 && 'disabled')}
                  onClick={() => page > 1 && handlePageChange(page - 1)}
                  disabled={page === 1}
                  aria-label={isEn ? 'Previous page' : '上一页'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  {isEn ? 'Prev' : '上一页'}
                </button>

                <ul className="blog-page-list">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <li key={p}>
                      <button
                        className={clsx('blog-page-num', p === page && 'active')}
                        onClick={() => handlePageChange(p)}
                        aria-label={`Page ${p}`}
                        aria-current={p === page ? 'page' : undefined}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  className={clsx('blog-page-nav', page === totalPages && 'disabled')}
                  onClick={() => page < totalPages && handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  aria-label={isEn ? 'Next page' : '下一页'}
                >
                  {isEn ? 'Next' : '下一页'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: tag sidebar ── */}
        {TagSidebar}
      </div>
    </BlogLayout>
  );
}
