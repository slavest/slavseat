import React from 'react';

import clsx from 'clsx';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'red' | 'green';
}

const Tag = ({ color = 'green', className, ...rest }: TagProps) => {
  return (
    <span
      className={clsx(
        'inline-flex px-2 py-1 rounded-full',
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
