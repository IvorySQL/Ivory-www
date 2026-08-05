const GAP = 14;
const VIEWPORT_MARGIN = 12;

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function getExpertPopoverPosition(trigger, popover, viewport) {
  const availableWidth = Math.max(0, viewport.width - (VIEWPORT_MARGIN * 2));
  const popoverWidth = Math.min(popover.width, availableWidth);
  const rightSpace = viewport.width - VIEWPORT_MARGIN - trigger.right - GAP;
  const leftSpace = trigger.left - GAP - VIEWPORT_MARGIN;
  const fitsRight = rightSpace >= popoverWidth;
  const fitsLeft = leftSpace >= popoverWidth;
  const side = fitsRight || (!fitsLeft && rightSpace >= leftSpace) ? 'right' : 'left';
  const requestedLeft = side === 'right'
    ? trigger.right + GAP
    : trigger.left - GAP - popoverWidth;
  const left = clamp(
    requestedLeft,
    VIEWPORT_MARGIN,
    Math.max(VIEWPORT_MARGIN, viewport.width - popoverWidth - VIEWPORT_MARGIN),
  );
  const availableHeight = Math.max(0, viewport.height - (VIEWPORT_MARGIN * 2));
  const popoverHeight = Math.min(popover.height, availableHeight);
  const centeredTop = trigger.top + (trigger.height - popoverHeight) / 2;
  const top = clamp(
    centeredTop,
    VIEWPORT_MARGIN,
    Math.max(VIEWPORT_MARGIN, viewport.height - popoverHeight - VIEWPORT_MARGIN),
  );

  return { left: Math.round(left), top: Math.round(top), side };
}

module.exports = getExpertPopoverPosition;
