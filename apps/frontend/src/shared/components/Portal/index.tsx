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
  wrapperId = 'react-portal-wrapper',
  className,
}: ReactPortalProps) => {
  const [element, setElement] = useState<HTMLElement>();

  useEffect(() => {
    const elem = document.getElementById(wrapperId);

    if (!elem) {
      setElement(createWrapperAndAppendToBody(wrapperId, className));
    } else {
      setElement(elem);
    }
  }, [className, wrapperId]);

  if (element) return createPortal(children, element);
  return null;
};

export default ReactPortal;
