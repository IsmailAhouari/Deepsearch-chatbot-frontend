export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;

  const hasCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches;
  const hasTouchScreen = navigator.maxTouchPoints > 0;
  const mobileUA = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  const narrowScreen = window.innerWidth <= 480;

  return (hasCoarsePointer && hasTouchScreen) || mobileUA || (hasTouchScreen && narrowScreen);
}
