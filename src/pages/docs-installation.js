import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const INSTALLATION_URLS = {
  en: 'https://docs.ivorysql.org/en/ivorysql-doc/v5.3/3.1#quick-installation',
  zh: 'https://docs.ivorysql.org/cn/ivorysql-doc/v5.3/3.1#%E5%BF%AB%E9%80%9F%E5%AE%89%E8%A3%85',
};

function buildTarget(locale) {
  const normalizedLocale = (locale || 'en').toLowerCase();
  return normalizedLocale.startsWith('zh') ? INSTALLATION_URLS.zh : INSTALLATION_URLS.en;
}

export default function DocsInstallationRedirect() {
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
