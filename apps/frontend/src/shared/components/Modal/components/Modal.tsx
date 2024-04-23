import React, { useCallback } from 'react';

import { cn } from '@/shared/utils/class.util';

import ReactPortal, { ReactPortalProps } from '../../Portal';
import { ModalContextProvider, ModalContextProviderProps } from '../context';
import { useModalContext } from '../hooks/useModalContext';

export interface ModalPortalProps extends ReactPortalProps {}

export const Modal: React.FC<ModalPortalProps> = ({ children, ...rest }) => {
  const { open, closeOnBackdropClick, closeModal } = useModalContext();

  const handleClickBackdrop = useCallback(() => {
    if (closeOnBackdropClick) closeModal();
  }, [closeModal, closeOnBackdropClick]);

  return (
    <ReactPortal {...rest}>
      {open && (
        <div
          className={cn(
            `absolute top-0 h-full w-full`,
            `flex items-center justify-center`,
            // tw`hidden transition-opacity opacity-0`,
            // open && tw`flex opacity-100`,
          )}
        >
          <div
            className={cn(`absolute z-30 h-full w-full`, `bg-black bg-opacity-50`)}
            onClick={handleClickBackdrop}
          />
          <div
            className={cn(
              `z-50`,
              `p-4`,
              `inline-block min-w-[10rem]`,
              `bg-white`,
              `rounded-lg`,
              // `text-gray-200 text-opacity-70`,
            )}
          >
            {children}
          </div>
        </div>
      )}
    </ReactPortal>
  );
};

export interface ModalRootProps extends React.PropsWithChildren, ModalContextProviderProps {}

export const Root: React.FC<ModalRootProps> = ({ children, ...rest }) => {
  return (
    <ModalContextProvider {...rest}>
      <Modal wrapperId="modal-portal">{children}</Modal>
    </ModalContextProvider>
  );
};
