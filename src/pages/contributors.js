import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useDeferredValue, useMemo, useState } from 'react';
import { contributorYears, contributors } from '../data/contributors';
import styles from './contributors.module.css';

const CERTIFICATE_REPO_URL = 'https://github.com/IvorySQL/community';

const COPY = {
  en: {
    pageTitle: 'Contributors Wall',
    pageDescription:
      'A wall highlighting the people who contribute to IvorySQL.',
    heroTitle: 'IvorySQL Contributors Wall',
    heroDescription:
      'This page highlights contributors to IvorySQL. They help move the project forward by submitting code, opening issues, fixing bugs, improving documentation, participating in testing, and growing the community.',
    heroMeta: {
      contributors: 'contributors',
      years: 'included',
      category: 'Category: Contributor',
    },
    filters: {
      all: 'All Contributors',
      searchPlaceholder: 'Search by name or GitHub handle',
    },
    sectionTitle: 'Community Contributors',
    resultLabel: 'contributors shown',
    empty: 'No contributors matched the current filter.',
    ctaText:
      'Want to appear here? Start by joining the IvorySQL contribution flow.',
    certificateText:
      'Contributor certificates are available in the IvorySQL community repository.',
    certificateLink: 'View or claim your contributor certificate',
    ctaButton: 'View Contribution Guidelines',
  },
  zh: {
    pageTitle: '贡献者墙',
    pageDescription: '展示 IvorySQL 贡献者的页面。',
    heroTitle: 'IvorySQL 贡献者墙',
    heroDescription:
      '本页面展示的是 IvorySQL 的贡献者。他们通过提交代码、提交 Issue、修复 Bug、完善文档、参与测试和推广社区等方式，为 IvorySQL 的发展持续做出贡献。',
    heroMeta: {
      contributors: '位贡献者',
      years: '收录年份',
      category: '当前类别：Contributor',
    },
    filters: {
      all: '全部贡献者',
      searchPlaceholder: '按姓名或 GitHub handle 搜索',
    },
    sectionTitle: '社区贡献者',
    resultLabel: '位贡献者',
    empty: '当前筛选条件下没有匹配的贡献者。',
    ctaText:
      '也想出现在这里？从参与 IvorySQL 社区贡献开始。',
    certificateText:
      '贡献者证书已上传到 IvorySQL community 仓库，可前往查看并领取。',
    certificateLink: '查看并领取贡献者证书',
    ctaButton: '查看贡献指南',
  },
};

function getToneClass(id) {
  const seed = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return styles[`tone${seed % 6}`];
}

function getMonogram(name) {
  const cleaned = name.replace(/^@/, '');
  const parts = cleaned.split(/[\s-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

function ContributorCard({ contributor, copy }) {
  const toneClass = getToneClass(contributor.id);
  const githubUrl = contributor.github ? `https://github.com/${contributor.github}` : null;
  const localAvatarUrl = contributor.avatarSrc ? useBaseUrl(contributor.avatarSrc) : null;
  const showGithubAvatar = !localAvatarUrl && githubUrl && contributor.avatarMode !== 'monogram';
  const avatarSrc = localAvatarUrl || (showGithubAvatar
    ? `https://github.com/${contributor.github}.png?size=240`
    : null);
  const handleText = githubUrl ? `@${contributor.github}` : null;
  const yearsLabel = contributor.years.join(' · ');

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={clsx(styles.avatar, toneClass)}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={contributor.name}
              loading="lazy"
            />
          ) : (
            <span className={styles.avatarFallback}>{getMonogram(contributor.name)}</span>
          )}
        </div>
        <div className={styles.cardTitleBlock}>
          {githubUrl ? (
            <a
              className={styles.cardTitleLink}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className={styles.cardTitle}>{contributor.name}</h3>
            </a>
          ) : (
            <h3 className={styles.cardTitle}>{contributor.name}</h3>
          )}
          {handleText ? (
            <p className={styles.cardHandle}>{handleText}</p>
          ) : null}
        </div>
      </div>

      <p className={styles.cardYears}>{yearsLabel}</p>
    </article>
  );
}

export default function ContributorsPage() {
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale.toLowerCase().startsWith('zh');
  const copy = isZh ? COPY.zh : COPY.en;
  const [selectedYear, setSelectedYear] = useState('all');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const includedYears = `${contributorYears[contributorYears.length - 1]}-${contributorYears[0]}`;

  const filterOptions = useMemo(
    () => [
      { key: 'all', label: copy.filters.all },
      ...contributorYears.map((year) => ({ key: String(year), label: String(year) })),
    ],
    [copy.filters.all],
  );

  const filteredContributors = useMemo(() => {
    return contributors.filter((item) => {
      const matchesYear =
        selectedYear === 'all' || item.years.includes(Number(selectedYear));
      const matchesQuery =
        !deferredQuery ||
        item.name.toLowerCase().includes(deferredQuery) ||
        (item.github && item.github.toLowerCase().includes(deferredQuery));

      return matchesYear && matchesQuery;
    });
  }, [deferredQuery, selectedYear]);

  return (
    <Layout title={copy.pageTitle} description={copy.pageDescription}>
      <main className={styles.page}>
        <div className="container">
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
              <p className={styles.heroDescription}>{copy.heroDescription}</p>
              <div className={styles.heroMeta}>
                <span>{contributors.length} {copy.heroMeta.contributors}</span>
                <span>{includedYears} {copy.heroMeta.years}</span>
                <span>{copy.heroMeta.category}</span>
              </div>
            </div>
          </section>

          <section className={styles.controls}>
            <div className={styles.chipGroup}>
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={clsx(styles.chip, selectedYear === option.key && styles.chipActive)}
                  onClick={() => setSelectedYear(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className={styles.searchWrap}>
              <input
                className={styles.searchInput}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.filters.searchPlaceholder}
                aria-label={copy.filters.searchPlaceholder}
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{copy.sectionTitle}</h2>
              <p className={styles.resultLabel}>
                {filteredContributors.length} {copy.resultLabel}
              </p>
            </div>

            {filteredContributors.length ? (
              <div className={styles.grid}>
                {filteredContributors.map((contributor) => (
                  <ContributorCard
                    key={contributor.id}
                    contributor={contributor}
                    copy={copy}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>{copy.empty}</div>
            )}
          </section>

          <section className={styles.cta}>
            <div className={styles.ctaContent}>
              <p className={styles.ctaText}>{copy.ctaText}</p>
              <p className={styles.ctaSubtext}>
                {copy.certificateText}{' '}
                <a
                  className={styles.ctaInlineLink}
                  href={CERTIFICATE_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.certificateLink}
                </a>
              </p>
            </div>
            <Link className={styles.ctaButton} to="/contribution-guidelines">
              {copy.ctaButton}
            </Link>
          </section>
        </div>
      </main>
    </Layout>
  );
}
