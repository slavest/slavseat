import React from 'react';

import { useTabContext } from '../context';

interface ContentProps extends React.PropsWithChildren {
  id: string;
}

export function Content({ id, children }: ContentProps) {
  const { openId } = useTabContext();

  if (openId === id) return children;
  return null;
}
