import React, { useCallback } from 'react';
import GridLayout, { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Model } from '@slavseat/types';
import { FacilitySummary } from '@slavseat/types/src/model';
import clsx from 'clsx';

import { Text } from '@/components/atoms/Text';
import { hideScrollBar } from '@/global-style.css';
import { useControlled } from '@/hooks/useControlled';

import './index.css';

export type FacilityGridEditorMode = 'select' | 'edit';

interface FacilityGridEditorProps {
  facilities?: Model.FacilitySummary[];
  defaultFacilities?: Model.FacilitySummary[];
  mode?: FacilityGridEditorMode;
  selected?: Model.FacilitySummary[];
  onChange?: (data: Model.FacilitySummary[]) => void;
  onSelectChange?: (data: Model.FacilitySummary[]) => void;
}

function FacilityGridEditor({
  facilities: facilitiesProp,
  defaultFacilities = [],
  selected: selectedProp,
  mode = 'edit',
  onChange,
  onSelectChange,
}: FacilityGridEditorProps) {
  const [selected, setSelected] = useControlled([], selectedProp);
  const [facilities, setFacilities] = useControlled(
    defaultFacilities,
    facilitiesProp,
  );

  const getFacility = useCallback(
    (id: number | string): FacilitySummary => {
      const facility = facilities
        .filter((facility) => String(facility.id) === String(id))
        .at(0);
      if (!facility)
        throw new Error('시설 정보를 읽는 중에 오류가 발생했습니다.');

      return facility;
    },
    [facilities],
  );

  const handleChangeGrid = useCallback(
    (layout: GridLayout.Layout[]) => {
      const data: Model.FacilitySummary[] = layout.map((item) => {
        const facility = getFacility(item.i);

        return {
          ...facility,
          ...item,
        };
      });

      setFacilities(data);
      onChange?.(data);
    },
    [getFacility, onChange, setFacilities],
  );

  const handleChangeAdditionalData = useCallback(
    (
      id: number,
      key: keyof Model.FacilitySummary,
      value: string | number,
    ) => {
      const data: Model.FacilitySummary[] = facilities.map(
        (facility) => {
          if (facility.id === id) {
            return {
              ...facility,
              [key]: value,
            };
          }

          return facility;
        },
      );

      setFacilities(data);
      onChange?.(data);
    },
    [onChange, facilities, setFacilities],
  );

  const handleClickFacility = useCallback(
    (facility: Model.FacilitySummary) => {
      if (mode === 'select') {
        const index = selected.findIndex(
          (item) => item.id === facility.id,
        );
        if (index === -1) {
          const data = [...selected, facility];
          setSelected(data);
          onSelectChange?.(data);
        } else {
          const data = selected.filter((_, i) => i !== index);
          setSelected(data);
          onSelectChange?.(data);
        }
      }
    },
    [mode, onSelectChange, selected, setSelected],
  );

  return (
    <GridLayout
      compactType={null}
      preventCollision={true}
      layout={facilities.map((facility) => ({
        ...facility,
        i: String(facility.id),
      }))}
      onLayoutChange={handleChangeGrid}
      cols={100}
      rowHeight={50}
      width={5000}
      margin={[0, 0]}
      isDraggable={mode === 'edit'}
      isResizable={mode === 'edit'}
    >
      {facilities.map((facility) => (
        <div key={facility.id} className="p-1">
          <div
            className={clsx(
              'w-full h-full inline-flex flex-col gap-2 justify-center items-center bg-neutral-50 border rounded-md select-none p-2 box-border',
              {
                'cursor-pointer': mode === 'select',
                'border-neutral-200':
                  mode === 'edit' ||
                  !selected.filter((item) => facility.id === item.id)
                    .length,
                'border-blue-500':
                  mode === 'select' &&
                  selected.filter((item) => facility.id === item.id)
                    .length,
              },
            )}
            onClick={() => handleClickFacility(facility)}
          >
            {mode === 'edit' && (
              <>
                <input
                  className="w-full px-1 border border-neutral-200 rounded text-sm"
                  value={facility.name}
                  onClickCapture={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleChangeAdditionalData(
                      facility.id,
                      'name',
                      e.target.value,
                    )
                  }
                />
                <select
                  className="w-full border border-neutral-200 rounded text-sm"
                  value={facility.type}
                  onChange={(e) =>
                    handleChangeAdditionalData(
                      facility.id,
                      'type',
                      Number(e.target.value),
                    )
                  }
                >
                  <option value={Model.FacilityType.MEETING_ROOM}>
                    회의실
                  </option>
                  <option value={Model.FacilityType.SEAT}>
                    좌석
                  </option>
                  <option value={Model.FacilityType.NONE}>
                    기타
                  </option>
                </select>
              </>
            )}
            {mode === 'select' && (
              <Text fontSize="14">{facility.name}</Text>
            )}
          </div>
        </div>
      ))}
    </GridLayout>
  );
}

export default FacilityGridEditor;
