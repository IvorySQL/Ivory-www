import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const DOCS_BASE = 'https://docs.ivorysql.org';
const DOCS_VERSION = 'v5.3/v5.3';

function buildTarget(locale) {
  const normalizedLocale = (locale || 'en').toLowerCase();
  const docsLocaleSegment = normalizedLocale.startsWith('zh') ? 'cn' : 'en';
  return `${DOCS_BASE}/${docsLocaleSegment}/ivorysql-doc/${DOCS_VERSION}/3.1#quick-installation`;
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
