import React from 'react';
import clsx from 'clsx';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItems from '@theme/BlogPostItems';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function BlogListPage(props) {
  const {items, sidebar} = props;
  const {i18n} = useDocusaurusContext();
  const isEn = i18n.currentLocale === 'en';
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentCat = query.get('cat');

  const filteredItems = currentCat 
    ? (items || []).filter(item => item.content.frontMatter.category === currentCat)
    : (items || []);

  return (
    <BlogLayout sidebar={sidebar}>
      <div className="category-nav-container">
        <Link to="/blog" className={clsx('category-nav-link', !currentCat && 'active-link')}>
          {isEn ? 'All Blogs' : '所有博客'}
        </Link>
        <Link to="/blog?cat=IvorySQL" className={clsx('category-nav-link', currentCat === 'IvorySQL' && 'active-link')}>
          IvorySQL
        </Link>
        <Link to="/blog?cat=PostgreSQL" className={clsx('category-nav-link', currentCat === 'PostgreSQL' && 'active-link')}>
          PostgreSQL
        </Link>
      </div>

      <BlogPostItems items={filteredItems} />
    </BlogLayout>
  );
}