const DIALOG_MODE_QUERY = '(max-width: 699px), (hover: none), (pointer: coarse)';

function isDialogMode(matchMedia) {
  return matchMedia(DIALOG_MODE_QUERY).matches;
}

function getAvatarFramingStyle(expert) {
  if (!expert.avatarFraming) return undefined;
  return {
    '--avatar-scale': expert.avatarFraming.scale,
    '--avatar-position': expert.avatarFraming.position,
  };
}

function getFocusTrapTarget(activeIndex, focusableCount, shiftKey) {
  if (focusableCount === 0) return null;
  if (activeIndex === -1) return shiftKey ? focusableCount - 1 : 0;
  if (shiftKey && activeIndex === 0) return focusableCount - 1;
  if (!shiftKey && activeIndex === focusableCount - 1) return 0;
  return null;
}

module.exports = {
  DIALOG_MODE_QUERY,
  getAvatarFramingStyle,
  getFocusTrapTarget,
  isDialogMode,
};
