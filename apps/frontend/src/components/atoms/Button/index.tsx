import { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';

import { buttonVariants } from './button.css';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  RecipeVariants<typeof buttonVariants>;

export const Button = ({
  variant,
  disabled,
  size,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        buttonVariants({ variant, disabled, size }),
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
