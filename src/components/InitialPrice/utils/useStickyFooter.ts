import { useEffect } from 'react';

const isVisible = (el: HTMLElement): boolean => {
  if (el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    return isVisible;
  } else {
    return false;
  }
};
const useStickyFooter = () => {
  useEffect(() => {
    const handleScroll = (): void => {
      const stickyFooter = document.getElementById('stickyFooter');
      const priceDetails = document.getElementById('priceDetails');

      if (priceDetails && stickyFooter) {
        const footerDisplay = isVisible(priceDetails) ? 'none' : 'block';
        stickyFooter.style.display = footerDisplay;
      }
    };

    document.addEventListener('scroll', handleScroll);

    return (): void => document.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useStickyFooter;
