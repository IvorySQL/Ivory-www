const assert = require('node:assert/strict');
const getExpertPopoverPosition = require('../src/utils/getExpertPopoverPosition.cjs');

const viewport = { width: 1280, height: 720 };
const popover = { width: 292, height: 236 };

assert.deepEqual(
  getExpertPopoverPosition(
    { left: 100, right: 194, top: 580, bottom: 674, width: 94, height: 94 },
    popover,
    viewport,
  ),
  { left: 208, top: 472, side: 'right' },
  'keeps a right-side popover inside the viewport bottom',
);

assert.deepEqual(
  getExpertPopoverPosition(
    { left: 1120, right: 1214, top: 18, bottom: 112, width: 94, height: 94 },
    popover,
    viewport,
  ),
  { left: 814, top: 12, side: 'left' },
  'moves the popover left and keeps it inside the viewport top',
);

console.log('Expert popover positioning tests passed.');
