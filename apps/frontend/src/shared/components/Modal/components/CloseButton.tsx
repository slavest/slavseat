import React, { useCallback } from 'react';
import { HiXMark } from 'react-icons/hi2';

import { useModalContext } from '../hooks/useModalContext';

export interface CloseButton
  extends React.HTMLAttributes<HTMLButtonElement> {}

export const CloseButton: React.FC<CloseButton> = ({
  onClick,
  ...props
}) => {
  const { closeModal } = useModalContext();

  const handleClickButton = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      // close button에 커스텀 이벤트 리스너 함수가 있으면 기존 로직을 사용하지 않음
      if (onClick === undefined) closeModal();
      onClick?.(e);
    },
    [onClick, closeModal],
  );

  return (
    <button onClick={handleClickButton} {...props}>
      <HiXMark className="w-4 h-4" />
    </button>
  );
};
