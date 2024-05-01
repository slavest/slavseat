import React, { useCallback, useEffect, useState } from 'react';

import { Model } from '@slavseat/types';

import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { Loading } from '@/shared/components/Loading';
import { Modal } from '@/shared/components/Modal';

interface EditFloorModalProps {
  floorId: number;
  onClose?: () => void;
  onSubmit?: (data: Model.FloorInfo) => void;
}

export function EditFloorModal({ floorId, onSubmit, ...rest }: EditFloorModalProps) {
  const { data, isLoading } = useGetFloorDetailQuery(floorId);
  const [editingData, setEditingData] = useState<typeof data>();
  useEffect(() => setEditingData(data), [data]);

  const handleUpdateField = useCallback(
    (fieldName: keyof Model.FloorInfo, d: Model.FloorInfo[keyof Model.FloorInfo]) => {
      setEditingData((prev) => {
        if (!prev) return prev;
        return { ...prev, [fieldName]: d };
      });
    },
    [],
  );

  return (
    <Modal.Root open closeOnBackdropClick={false} {...rest}>
      <div className="space-y-4">
        <div className="flex justify-between font-semibold">
          층 정보 수정
          <Modal.CloseButton />
        </div>
        {isLoading || !data ? (
          <Loading />
        ) : (
          <>
            <div className="space-y-1">
              <div className="text-xs text-neutral-400">이름</div>
              <input
                className="rounded-md border border-neutral-400 p-1 text-sm focus:outline-purple-600"
                defaultValue={data.name}
                type="text"
                onChange={(e) => handleUpdateField('name', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs text-neutral-400">비활성</div>
              <input
                defaultChecked={data.disabled}
                type="checkbox"
                onChange={(e) => handleUpdateField('disabled', e.target.checked)}
              />
            </div>
          </>
        )}
        <div className="flex w-full justify-end">
          <button
            className="rounded-xl bg-violet-600 px-4 py-1.5 text-white"
            onClick={() => editingData && onSubmit?.(editingData)}
          >
            저장
          </button>
        </div>
      </div>
    </Modal.Root>
  );
}
