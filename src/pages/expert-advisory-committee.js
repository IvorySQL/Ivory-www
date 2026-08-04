import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useEffect, useRef, useState } from 'react';
import experts from '../data/expertCommittee.json';
import getExpertPopoverPosition from '../utils/getExpertPopoverPosition.cjs';
import styles from './expert-advisory-committee.module.css';

const COPY = {
  en: {
    pageTitle: 'Expert Advisory Committee',
    pageDescription: 'Meet the experts guiding IvorySQL technology and community development.',
    eyebrow: 'Community Leadership',
    heroTitle: 'Expert Advisory Committee',
    heroDescription:
      'Bringing together experienced database specialists and open-source leaders from around the world to provide long-term guidance for IvorySQL technology, ecosystem, and community development.',
    expertCount: 'experts',
    globalPerspective: 'Global perspective',
    unordered: 'Listed in no particular order',
    sectionTitle: 'Committee Members',
    sectionDescription: 'Hover over a portrait or name to read a short biography.',
    hoverHint: 'Hover to view profile',
    profileLabel: 'Expert profile',
    close: 'Close expert profile',
    emptyAvatar: 'Portrait coming soon',
  },
  zh: {
    pageTitle: '专家顾问委员会',
    pageDescription: '了解为 IvorySQL 产品技术与社区发展提供指导的专家委员。',
    eyebrow: 'Community Leadership',
    heroTitle: '专家顾问委员会',
    heroDescription:
      '汇聚全球数据库领域的资深专家与开源领袖，为 IvorySQL 的产品技术、生态建设与社区发展提供长期、专业的战略指导。',
    expertCount: '位专家',
    globalPerspective: '全球技术视野',
    unordered: '排名不分先后',
    sectionTitle: '委员会成员',
    sectionDescription: '将鼠标移至头像或姓名，即可查看专家简介。',
    hoverHint: '悬停查看简介',
    profileLabel: '专家简介',
    close: '关闭专家简介',
    emptyAvatar: '头像待补充',
  },
};

function EmptyAvatar() {
  return (
    <span className={styles.emptyAvatar} aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <circle cx="32" cy="24" r="11" />
        <path d="M14 54c2-11 8-17 18-17s16 6 18 17" />
      </svg>
    </span>
  );
}

function ExpertCard({ expert, locale, copy, onOpen }) {
  const popoverRef = useRef(null);
  const [popoverPosition, setPopoverPosition] = useState(null);
  const resolvedAvatar = useBaseUrl(expert.avatar || '/');
  const name = expert.name[locale];
  const title = expert.title[locale];
  const biography = expert.bio[locale];
  const popoverId = `${expert.id}-bio`;

  const openOnTouch = () => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    ) {
      onOpen(expert);
    }
  };

  const positionPopover = (event) => {
    if (!popoverRef.current) return;

    const trigger = event.currentTarget.getBoundingClientRect();
    const popover = popoverRef.current.getBoundingClientRect();
    setPopoverPosition(
      getExpertPopoverPosition(trigger, popover, {
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    );
  };

  return (
    <article className={styles.card} data-expert-card="true">
      <button
        type="button"
        className={styles.profileTrigger}
        aria-describedby={popoverId}
        onClick={openOnTouch}
        onFocus={positionPopover}
        onMouseEnter={positionPopover}
      >
        <span
          className={styles.avatarFrame}
          data-avatar-empty={expert.avatar ? undefined : 'true'}
        >
          {expert.avatar ? (
            <img
              src={resolvedAvatar}
              alt={name}
              width="188"
              height="188"
              loading="lazy"
            />
          ) : (
            <EmptyAvatar />
          )}
        </span>
        <span className={styles.name}>{name}</span>
      </button>

      <span className={styles.title}>{title}</span>

      <aside
        ref={popoverRef}
        id={popoverId}
        role="tooltip"
        className={styles.bioPopover}
        data-side={popoverPosition?.side}
        style={
          popoverPosition
            ? { left: popoverPosition.left, top: popoverPosition.top }
            : undefined
        }
      >
        <span className={styles.profileLabel}>{copy.profileLabel}</span>
        <strong>{name}</strong>
        <span className={styles.popoverTitle}>{title}</span>
        <p>{biography}</p>
      </aside>
    </article>
  );
}

function MobileBioDialog({ expert, locale, copy, onClose }) {
  if (!expert) return null;

  return (
    <div className={styles.dialogBackdrop} role="presentation" onClick={onClose}>
      <section
        className={styles.mobileDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="expert-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.dialogClose}
          onClick={onClose}
          aria-label={copy.close}
        >
          ×
        </button>
        <span className={styles.profileLabel}>{copy.profileLabel}</span>
        <h2 id="expert-dialog-title">{expert.name[locale]}</h2>
        <strong>{expert.title[locale]}</strong>
        <p>{expert.bio[locale]}</p>
      </section>
    </div>
  );
}

export default function ExpertAdvisoryCommitteePage() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  const copy = COPY[locale];
  const [selectedExpert, setSelectedExpert] = useState(null);

  useEffect(() => {
    if (!selectedExpert) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedExpert(null);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [selectedExpert]);

  return (
    <Layout title={copy.pageTitle} description={copy.pageDescription}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1>{copy.heroTitle}</h1>
              <p className={styles.heroDescription}>{copy.heroDescription}</p>
              <div className={styles.heroMeta}>
                <span>{experts.length} {copy.expertCount}</span>
                <span>{copy.globalPerspective}</span>
                <span>{copy.unordered}</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.membersSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <h2>{copy.sectionTitle}</h2>
                <p>{copy.sectionDescription}</p>
              </div>
              <span className={styles.hoverHint}>{copy.hoverHint}</span>
            </div>

            <div className={styles.grid}>
              {experts.map((expert) => (
                <ExpertCard
                  key={expert.id}
                  expert={expert}
                  locale={locale}
                  copy={copy}
                  onOpen={setSelectedExpert}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <MobileBioDialog
        expert={selectedExpert}
        locale={locale}
        copy={copy}
        onClose={() => setSelectedExpert(null)}
      />
    </Layout>
  );
}
