import React, { useEffect, useState } from 'react';

export const useScrollLock = () => {
  const [isiOS, setIsiOS] = useState(false);
  const scrollOffset = React.useRef(0);

  const lockScroll = React.useCallback(() => {
    document.body.dataset.scrollLock = 'true';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = 'var(--scrollbar-compensation)';

    if (isiOS) {
      scrollOffset.current = window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollOffset.current}px`;
      document.body.style.width = '100%';
    }
  }, [isiOS]);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    if (isiOS) {
      document.body.style.position = '';
      document.body.style.top = ``;
      document.body.style.width = '';
      window.scrollTo(0, scrollOffset.current);
    }
    delete document.body.dataset.scrollLock;
  }, [isiOS]);

  React.useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      '--scrollbar-compensation',
      `${scrollBarCompensation}px`
    );
  }, []);

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsiOS(userAgent.includes('iphone') || userAgent.includes('ipad'));
  }, []);
};
