import React from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';

import { useTabContext } from '../context';
import { triggerStyle } from '../tab.css';

type TriggerProps = React.PropsWithChildren &
  RecipeVariants<typeof triggerStyle> & {
    id: string;
  };

export function Trigger({ id, children }: TriggerProps) {
  const { openId, onOpenChange } = useTabContext();

  return (
    <button className={triggerStyle({ active: id === openId })} onClick={() => onOpenChange(id)}>
      {children}
    </button>
  );
}
