const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  DIALOG_MODE_QUERY,
  getFocusTrapTarget,
  isDialogMode,
} = require('../src/utils/expertCommitteeInteraction.cjs');

let receivedQuery;
assert.equal(
  isDialogMode((query) => {
    receivedQuery = query;
    return { matches: true };
  }),
  true,
  'uses the matching interaction mode result',
);
assert.equal(
  receivedQuery,
  '(max-width: 699px), (hover: none), (pointer: coarse)',
  'keeps the JavaScript dialog mode aligned with the mobile CSS breakpoint and pointer modes',
);
assert.equal(DIALOG_MODE_QUERY, receivedQuery);
assert.equal(isDialogMode(() => ({ matches: false })), false);

[
  { activeIndex: -1, count: 3, shiftKey: false, expected: 0 },
  { activeIndex: -1, count: 3, shiftKey: true, expected: 2 },
  { activeIndex: 0, count: 3, shiftKey: true, expected: 2 },
  { activeIndex: 2, count: 3, shiftKey: false, expected: 0 },
  { activeIndex: 1, count: 3, shiftKey: false, expected: null },
  { activeIndex: 0, count: 1, shiftKey: false, expected: 0 },
  { activeIndex: 0, count: 1, shiftKey: true, expected: 0 },
  { activeIndex: -1, count: 0, shiftKey: false, expected: null },
].forEach(({ activeIndex, count, shiftKey, expected }) => {
  assert.equal(
    getFocusTrapTarget(activeIndex, count, shiftKey),
    expected,
    `focus trap target for active ${activeIndex}, count ${count}, shift ${shiftKey}`,
  );
});

const committeeCss = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'pages', 'expert-advisory-committee.module.css'),
  'utf8',
);
assert.match(committeeCss, /\.bioPopover:hover\s*\{/);
assert.match(committeeCss, /\.bioPopover::after\s*\{[^}]*left: -16px;[^}]*width: 16px;/s);
assert.match(committeeCss, /\.bioPopover\s*\{[^}]*pointer-events: auto;/s);
assert.match(committeeCss, /visibility 0s linear 0\.15s;/);

console.log('Expert committee interaction helper tests passed.');
