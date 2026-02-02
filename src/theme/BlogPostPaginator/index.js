import React from 'react';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function BlogPostPaginator(props) {
  const {nextItem, prevItem} = props;
  const {i18n} = useDocusaurusContext();
  const isEn = i18n.currentLocale === 'en';

  return (
    <nav className="pagination-nav docusaurus-mt-lg">
      {prevItem && (
        <PaginatorNavLink
          {...prevItem}
          subLabel={isEn ? 'Newer Post' : '下一篇'}
        />
      )}
      {nextItem && (
        <PaginatorNavLink
          {...nextItem}
          subLabel={isEn ? 'Older Post' : '上一篇'}
          isNext
        />
      )}
    </nav>
  );
}