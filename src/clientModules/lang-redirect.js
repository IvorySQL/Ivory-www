/**
 * Docusaurus Client Module for Language Detection
 * This module runs on the client side and handles browser language detection
 */
export function onRouteDidUpdate({ location, previousLocation }) {
  // Only run on root path
  if (location.pathname !== '/' && location.pathname !== '/index.html') {
    return;
  }

  // Check if user has an existing locale preference (manual language selection)
  const savedLocale = localStorage.getItem('docusaurus.locale');
  if (savedLocale === 'en') {
    // User explicitly chose English, respect it and don't redirect
    return;
  }

  if (savedLocale === 'zh-CN') {
    // User chose Chinese, no need to redirect
    return;
  }

  // Check if this is the first visit to the root path in this session
  if (sessionStorage.getItem('clientLangDetectionDone')) {
    return;
  }

  // Detect browser language
  const browserLang = navigator.language || navigator.userLanguage || '';

  // Redirect Chinese users to Chinese version
  if (browserLang.toLowerCase().startsWith('zh')) {
    // Mark as done before redirecting to prevent loops
    sessionStorage.setItem('clientLangDetectionDone', '1');
    // Redirect Chinese users to Chinese version
    window.location.replace('/zh-CN/');
  } else {
    // Mark as done for non-Chinese users too
    sessionStorage.setItem('clientLangDetectionDone', '1');
  }
}
