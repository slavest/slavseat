import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';

import { hideScrollBar } from '@/shared/styles/global-style.css';

interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function ScrollArea({
  className,
  children,
  ...rest
}: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const [xThumbSize, setXThumbSize] = useState(0);
  const [yThumbSize, setYThumbSize] = useState(0);

  const [xScroll, setXScroll] = useState(0);
  const [yScroll, setYScroll] = useState(0);

  const updateScroll = useCallback(() => {
    if (!viewportRef.current) return;

    const {
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = viewportRef.current;

    setXThumbSize((clientWidth * 100) / scrollWidth);
    setXScroll((scrollLeft * 100) / scrollWidth);

    setYThumbSize((clientHeight * 100) / scrollHeight);
    setYScroll((scrollTop * 100) / scrollHeight);
  }, []);

  useEffect(() => {
    updateScroll();
  });

  return (
    <div
      className={clsx('relative', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={viewportRef}
        className={clsx(
          'w-full h-full overflow-scroll',
          hideScrollBar,
        )}
        onScroll={updateScroll}
        {...rest}
      >
        {children}
      </div>
      {hover && (
        <>
          {yThumbSize !== 100 && (
            <div
              className="absolute top-0 right-0 p-1 py-2 h-full"
              style={{
                height: `${viewportRef.current?.clientHeight ?? 0}px`,
              }}
            >
              <div
                className={clsx(
                  'relative w-1 bg-zinc-400 rounded-full',
                )}
                style={{
                  height: `${yThumbSize}%`,
                  top: `${yScroll}%`,
                }}
              />
            </div>
          )}
          {xThumbSize !== 100 && (
            <div
              className="absolute bottom-0 p-1 px-2 w-full"
              style={{
                width: `${viewportRef.current?.clientWidth ?? 0}px`,
              }}
            >
              <div
                className={clsx(
                  'relative h-1 bg-zinc-400 rounded-full',
                )}
                style={{
                  width: `${xThumbSize}%`,
                  left: `${xScroll}%`,
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ScrollArea;
