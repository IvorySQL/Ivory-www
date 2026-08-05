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

assert.deepEqual(
  getExpertPopoverPosition(
    { left: 300, right: 394, top: 240, bottom: 334, width: 94, height: 94 },
    popover,
    { width: 700, height: 720 },
  ),
  { left: 396, top: 169, side: 'right' },
  'uses the roomier side and clamps a three-column popover inside a 700px viewport',
);

assert.deepEqual(
  getExpertPopoverPosition(
    { left: 314, right: 408, top: 240, bottom: 334, width: 94, height: 94 },
    popover,
    { width: 720, height: 720 },
  ),
  { left: 12, top: 169, side: 'left' },
  'clamps a left-side popover inside a 720px viewport',
);

assert.deepEqual(
  getExpertPopoverPosition(
    { left: 200, right: 294, top: 200, bottom: 294, width: 94, height: 94 },
    { width: 292, height: 500 },
    { width: 1000, height: 480 },
  ),
  { left: 308, top: 12, side: 'right' },
  'keeps an over-height popover pinned to the short viewport margin',
);

console.log('Expert popover positioning tests passed.');
