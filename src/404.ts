/**
 * Avoid lack of dynamic routing support in GitHub Pages environment.
 * @see https://www.smashingmagazine.com/2016/08/sghpa-single-page-app-hack-github-pages/
 */
import { REQUESTED_URL_STORAGE_KEY } from 'Constants';

// Store requested URL.
window.sessionStorage.setItem(REQUESTED_URL_STORAGE_KEY, window.location.href);

// Obtain base URL.
const base = window.document.getElementsByTagName('base')[0].href;

// Trigger redirect using meta tag.
const meta = window.document.createElement('meta');
meta.httpEquiv = 'refresh';
meta.content = `0; URL="${base}"`;
window.document.head.appendChild(meta);
