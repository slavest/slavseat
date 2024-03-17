import { useCallback, useEffect, useMemo } from 'react';
import React from 'react';
import { HiCheck } from 'react-icons/hi';

import { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';

import { SelectItem, useSelectContext } from '../context';
import {
  selectItemIconVariants,
  selectItemVariants,
} from '../select.css';

export type SelectItemProps = Omit<SelectItem, 'label'> &
  React.HTMLAttributes<HTMLDivElement> &
  RecipeVariants<typeof selectItemVariants>;

const Item = ({
  id,
  value,
  disabled,
  className,
  children,
  ...rest
}: SelectItemProps) => {
  const { selected, handleSelectItem, addItem, removeItem } =
    useSelectContext();

  const isSelected = useMemo(
    () => selected.includes(id),
    [selected, id],
  );

  const handleClickItem = useCallback(() => {
    if (disabled) return;
    handleSelectItem({ id, value, label: children });
  }, [children, disabled, handleSelectItem, id, value]);

  useEffect(() => {
    addItem({ id, value, label: children });
    return () => removeItem(id);
  }, [addItem, children, id, removeItem, value]);

  return (
    <div
      className={clsx(selectItemVariants({ disabled }), className)}
      onClick={handleClickItem}
      {...rest}
    >
      <span>{children}</span>
      <HiCheck
        className={selectItemIconVariants({ visible: isSelected })}
      />
    </div>
  );
};

export default Item;
