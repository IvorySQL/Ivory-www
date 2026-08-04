const GAP = 14;
const VIEWPORT_MARGIN = 12;

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function getExpertPopoverPosition(trigger, popover, viewport) {
  const fitsRight = trigger.right + GAP + popover.width <= viewport.width - VIEWPORT_MARGIN;
  const side = fitsRight ? 'right' : 'left';
  const left = fitsRight
    ? trigger.right + GAP
    : trigger.left - GAP - popover.width;
  const centeredTop = trigger.top + (trigger.height - popover.height) / 2;
  const top = clamp(
    centeredTop,
    VIEWPORT_MARGIN,
    viewport.height - popover.height - VIEWPORT_MARGIN,
  );

  return { left: Math.round(left), top: Math.round(top), side };
}

module.exports = getExpertPopoverPosition;
