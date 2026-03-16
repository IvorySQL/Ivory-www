import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ECOSYSTEM_URLS = {
  en: 'https://docs.ivorysql.org/en/ivorysql-doc/v5.3/cpu_arch_adp',
  zh: 'https://docs.ivorysql.org/cn/ivorysql-doc/v5.3/cpu_arch_adp',
};

function buildTarget(locale) {
  const normalizedLocale = (locale || 'en').toLowerCase();
  return normalizedLocale.startsWith('zh') ? ECOSYSTEM_URLS.zh : ECOSYSTEM_URLS.en;
}

export default function DocsEcosystemRedirect() {
  const { i18n } = useDocusaurusContext();
  const target = buildTarget(i18n.currentLocale);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.location.replace(target);
  }, [target]);

  return (
    <Layout title="Redirecting...">
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Redirecting to documentation...</p>
        <p>
          If you are not redirected, <a href={target}>click here</a>.
        </p>
      </main>
    </Layout>
  );
}
