import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { createWrapperAndAppendToBody } from './util';

export interface ReactPortalProps {
  children: React.ReactNode;
  wrapperId?: string;
  className?: string;
}

const ReactPortal = ({
  children,
  className,
  wrapperId = 'react-portal-wrapper',
}: ReactPortalProps) => {
  const [element, setElement] = useState<HTMLElement>();

  useEffect(() => {
    const elem = document.getElementById(wrapperId);

    if (!elem) {
      setElement(createWrapperAndAppendToBody(wrapperId, className));
    } else {
      elem.className = className ?? '';
      setElement(elem);
    }
  }, [className, wrapperId]);

  if (element) return createPortal(children, element);
  return null;
};

export default ReactPortal;
