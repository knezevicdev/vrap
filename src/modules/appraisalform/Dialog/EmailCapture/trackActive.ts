import { useCallback, useEffect, useState } from 'react';

const useTrackActive = () => {
  const [active, changeActive] = useState(true);
  const [inactive, changeInactive] = useState(false);
  const [stopTrack, changeStopTrack] = useState(false);
  const [timing, changeTiming] = useState<any>(null);
  const eventKey = ['scroll', 'click', 'mousemove'];

  useEffect(() => {
    if (!stopTrack) {
      track();
    }
    return resetActive;
  }, [stopTrack]);

  useEffect(() => {
    if (!active && !timing) {
      changeTiming(
        setTimeout(() => {
          changeInactive(true);
        }, 6000)
      );
    } else {
      window.clearTimeout(timing);
      changeTiming(null);
    }
    changeActive(false);
  }, [active]);

  const resetActive = useCallback(() => {
    changeActive(true);
    changeInactive(false);
  }, []);

  const track = () => {
    eventKey.forEach((keys) => {
      window.addEventListener(keys, resetActive);
    });
  };

  const removeEvent = () => {
    window.clearTimeout(timing);
    changeTiming(null);
    changeStopTrack(true);
    eventKey.forEach((key) => {
      window.removeEventListener(key, resetActive);
    });
  };

  return { active, inactive, removeEvent, track };
};

export default useTrackActive;
