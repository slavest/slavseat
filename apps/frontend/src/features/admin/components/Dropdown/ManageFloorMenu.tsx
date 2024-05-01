import React from 'react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

import { DropdownMenu } from '@/shared/components/DropdownMenu';

type EditAction = {
  type: 'edit';
};

type DeleteAction = {
  type: 'delete';
};

export type ManageFloorMenuActionType = EditAction | DeleteAction;

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
          <DropdownMenu.Item onClick={() => onAction?.({ type: 'edit' })}>
            상세 정보 수정
          </DropdownMenu.Item>
          {/* <DropdownMenu.Item
            className="text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => onAction?.({ type: 'delete' })}
          >
            삭제
          </DropdownMenu.Item> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
