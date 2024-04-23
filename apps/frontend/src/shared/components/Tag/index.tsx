import React from 'react';

import { cn } from '@/shared/utils/class.util';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'red' | 'green';
}

const Tag = ({ color = 'green', className, ...rest }: TagProps) => {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-1',
        {
          'bg-red-400 text-white': color === 'red',
          'bg-green-400 text-white': color === 'green',
        },
        className,
      )}
      {...rest}
    />
  );
};

export default Tag;
