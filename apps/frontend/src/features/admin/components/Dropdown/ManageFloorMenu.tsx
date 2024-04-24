import React from 'react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

import { DropdownMenu } from '@/shared/components/DropdownMenu';

type EditAction = {
  type: 'edit';
};

export type ManageFloorMenuActionType = EditAction;

interface ManageFloorMenuProps {
  onAction?: (action: ManageFloorMenuActionType) => void;
}

export function ManageFloorMenu({ onAction }: ManageFloorMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <HiEllipsisHorizontal />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {/* <DropdownMenu.Item onClick={() => onAction?.({ type: 'viewInGrid' })}>
            좌석 배치도에서 보기
          </DropdownMenu.Item> */}
          <DropdownMenu.Item onClick={() => onAction?.({ type: 'edit' })}>
            층 수정
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
