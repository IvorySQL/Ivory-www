import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import experts from '../data/expertCommittee.json';
import {
  getFocusTrapTarget,
  isDialogMode,
} from '../utils/expertCommitteeInteraction.cjs';
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
    unordered: 'No ranking implied',
    sectionTitle: 'Committee Members',
    sectionDescription: 'Hover over or select a portrait or name to read a short biography.',
    orderNote: 'Experts are listed alphabetically by English name, with no ranking implied.',
    joinTitle: 'Join the IvorySQL Expert Advisory Committee',
    joinDescription:
      'We welcome more database experts to help advance the open-source database ecosystem with us.',
    joinAction: 'Contact us by email',
    hoverHint: 'Hover or select to view profile',
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
    sectionDescription: '将鼠标移至或选择头像、姓名，即可查看专家简介。',
    orderNote: '专家按英文姓名首字母顺序排列，排名不分先后。',
    joinTitle: '欢迎加入 IvorySQL 专家顾问委员会',
    joinDescription: '欢迎更多数据库专家加入 IvorySQL 专家顾问委员会，与我们共同推动开源数据库生态发展。',
    joinAction: '发送邮件联系我们',
    hoverHint: '悬停或选择查看简介',
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

  const openInDialogMode = (event) => {
    if (typeof window !== 'undefined' && isDialogMode(window.matchMedia.bind(window))) {
      onOpen(expert, event.currentTarget);
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
        onClick={openInDialogMode}
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

function MobileBioDialog({ expert, locale, copy, onClose, returnFocus }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!expert || !dialogRef.current) return undefined;

    const dialog = dialogRef.current;
    const previousFocus = returnFocus.current || document.activeElement;
    const backgroundElements = [...document.querySelectorAll('main, nav, footer')]
      .filter((element) => !element.contains(dialog));
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.getAttribute('inert'),
      ariaHidden: element.getAttribute('aria-hidden'),
    }));
    const previousOverflow = document.body.style.overflow;

    backgroundElements.forEach((element) => {
      element.setAttribute('inert', '');
      element.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = 'hidden';

    const closeOnEscapeOrTrapFocus = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusableElements = [...dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )];
      const targetIndex = getFocusTrapTarget(
        focusableElements.indexOf(document.activeElement),
        focusableElements.length,
        event.shiftKey,
      );
      if (targetIndex === null) return;

      event.preventDefault();
      focusableElements[targetIndex].focus();
    };
    const containFocus = (event) => {
      if (!dialog.contains(event.target)) closeButtonRef.current?.focus();
    };

    document.addEventListener('keydown', closeOnEscapeOrTrapFocus);
    document.addEventListener('focusin', containFocus);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', closeOnEscapeOrTrapFocus);
      document.removeEventListener('focusin', containFocus);
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        if (inert === null) element.removeAttribute('inert');
        else element.setAttribute('inert', inert);
        if (ariaHidden === null) element.removeAttribute('aria-hidden');
        else element.setAttribute('aria-hidden', ariaHidden);
      });
      document.body.style.overflow = previousOverflow;
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
  }, [expert, onClose, returnFocus]);

  if (!expert) return null;

  return (
    <div className={styles.dialogBackdrop} role="presentation" onClick={onClose}>
      <section
        ref={dialogRef}
        className={styles.mobileDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="expert-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
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
  const returnFocusRef = useRef(null);
  const openExpert = useCallback((expert, trigger) => {
    returnFocusRef.current = trigger;
    setSelectedExpert(expert);
  }, []);
  const closeExpert = useCallback(() => setSelectedExpert(null), []);

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
                <p>
                  {copy.orderNote} {copy.sectionDescription}
                </p>
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
                  onOpen={openExpert}
                />
              ))}
            </div>

            <aside className={styles.joinCommittee}>
              <div>
                <h2>{copy.joinTitle}</h2>
                <p>{copy.joinDescription}</p>
              </div>
              <a className={styles.joinAction} href="mailto:ivorysql1213@gmail.com">
                {copy.joinAction}
                <span aria-hidden="true">→</span>
              </a>
            </aside>
          </div>
        </section>
      </main>

      <MobileBioDialog
        expert={selectedExpert}
        locale={locale}
        copy={copy}
        onClose={closeExpert}
        returnFocus={returnFocusRef}
      />
    </Layout>
  );
}
