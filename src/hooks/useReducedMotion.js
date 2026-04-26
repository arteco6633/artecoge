/**
 * Returns true if the current device is mobile (≤900px)
 * or if the user has requested reduced motion in system settings.
 * Use this to conditionally disable Framer Motion animations.
 */
const useReducedMotion = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isMobile || prefersReduced;
};

export default useReducedMotion;
