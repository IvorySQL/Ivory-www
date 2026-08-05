const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  DIALOG_MODE_QUERY,
  getAvatarFramingStyle,
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

const cssSource = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'pages', 'expert-advisory-committee.module.css'),
  'utf8',
);
assert.deepEqual(
  getAvatarFramingStyle({
    avatarFraming: { scale: 1.8, position: '50% 32%' },
  }),
  {
    '--avatar-scale': 1.8,
    '--avatar-position': '50% 32%',
  },
  'maps framing metadata to the image CSS variables',
);
assert.equal(
  getAvatarFramingStyle({}),
  undefined,
  'leaves unframed portraits on the CSS defaults',
);
assert.match(cssSource, /\.bioPopover:hover\s*\{/);
assert.match(cssSource, /\.bioPopover::after\s*\{[^}]*left: -16px;[^}]*width: 16px;/s);
assert.match(cssSource, /\.bioPopover\s*\{[^}]*pointer-events: auto;/s);
assert.match(cssSource, /visibility 0s linear 0\.15s;/);
assert.match(cssSource, /object-position:\s*var\(--avatar-position, center\)/);
assert.match(cssSource, /transform:\s*scale\(var\(--avatar-scale, 1\)\)/);
assert.match(cssSource, /transform-origin:\s*var\(--avatar-position, center\)/);

console.log('Expert committee interaction helper tests passed.');
