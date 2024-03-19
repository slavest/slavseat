import React, { useCallback, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function Switch({ value, onChange }: SwitchProps) {
  const handleCheckInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.checked);

      onChange(event.target.checked);
    },
    [onChange],
  );

  return (
    <label
      className={clsx(
        'flex w-20 h-10 p-2 bg-white rounded-2xl shadow',
        value ? 'justify-start' : 'justify-end',
      )}
    >
      <input
        className="sr-only"
        type="checkbox"
        checked={value}
        onChange={handleCheckInput}
      />
      <motion.div
        layout
        className={clsx(
          'w-[50%] rounded-2xl shadow',
          value ? 'bg-green-500' : 'bg-neutral-500',
        )}
      />
    </label>
  );
}
