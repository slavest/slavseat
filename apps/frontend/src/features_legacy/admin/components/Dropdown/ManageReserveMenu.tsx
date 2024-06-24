import React from 'react';
import { AiFillTool } from 'react-icons/ai';

import { DropdownMenu } from '@/shared/components/DropdownMenu';

type ViewInGridAction = {
  type: 'viewInGrid';
};

type CancleReserve = {
  type: 'cancleReserve';
};

export type ManageReserveMenuActionType = ViewInGridAction | CancleReserve;

interface ManageReserveMenuProps {
  onAction?: (action: ManageReserveMenuActionType) => void;
}

export function ManageReserveMenu({ onAction }: ManageReserveMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <AiFillTool />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {/* <DropdownMenu.Item onClick={() => onAction?.({ type: 'viewInGrid' })}>
            좌석 배치도에서 보기
          </DropdownMenu.Item> */}
          <DropdownMenu.Item onClick={() => onAction?.({ type: 'cancleReserve' })}>
            예약 취소
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
