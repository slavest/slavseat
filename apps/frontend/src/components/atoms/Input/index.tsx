import React, { useCallback } from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';

import { Text } from '../Text';
import { inputStyle, inputWrapperVariants } from './input.css';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> &
  RecipeVariants<typeof inputWrapperVariants> & {
    onChange?: (value: string) => void;
    label?: string;
  };

const Input = ({
  label,
  className,
  onChange,
  ...rest
}: InputProps) => {
  const handleInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={clsx(className)}>
      {label && <Text fontSize="12">{label}</Text>}
      <input
        className={inputStyle}
        onChange={handleInputChange}
        {...rest}
      />
    </div>
  );
};

export default Input;
