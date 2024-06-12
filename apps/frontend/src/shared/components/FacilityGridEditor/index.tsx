import React, { useCallback } from 'react';
import GridLayout, { Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Model } from '@slavseat/types';
import { FacilitySummary } from '@slavseat/types/src/model';
import { Text } from '@slavseat/ui-core';

import { useControlled } from '@/shared/hooks/useControlled';
import { cn } from '@/shared/utils/class.util';

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
  const [facilities, setFacilities] = useControlled(defaultFacilities, facilitiesProp);

  const getFacility = useCallback(
    (id: number | string): FacilitySummary => {
      const facility = facilities.filter((facility) => String(facility.id) === String(id)).at(0);
      if (!facility) throw new Error('시설 정보를 읽는 중에 오류가 발생했습니다.');

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
    (id: number, key: keyof Model.FacilitySummary, value: string | number) => {
      const data: Model.FacilitySummary[] = facilities.map((facility) => {
        if (facility.id === id) {
          return {
            ...facility,
            [key]: value,
          };
        }

        return facility;
      });

      setFacilities(data);
      onChange?.(data);
    },
    [onChange, facilities, setFacilities],
  );

  const handleClickFacility = useCallback(
    (facility: Model.FacilitySummary) => {
      if (mode === 'select') {
        const index = selected.findIndex((item) => item.id === facility.id);
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
      cols={100}
      compactType={null}
      containerPadding={[25, 25]}
      isDraggable={mode === 'edit'}
      isResizable={mode === 'edit'}
      layout={facilities.map((facility) => ({
        ...facility,
        i: String(facility.id),
      }))}
      margin={[0, 0]}
      preventCollision={true}
      rowHeight={50}
      width={5000}
      onLayoutChange={handleChangeGrid}
    >
      {facilities.map((facility) => (
        <div key={facility.id} className="p-1">
          <div
            className={cn(
              'box-border inline-flex h-full w-full select-none flex-col items-center justify-center gap-2 rounded-md border bg-neutral-50 p-2',
              {
                'cursor-pointer': mode === 'select',
                'border-neutral-200':
                  mode === 'edit' || !selected.filter((item) => facility.id === item.id).length,
                'border-blue-500':
                  mode === 'select' && selected.filter((item) => facility.id === item.id).length,
              },
            )}
            onClick={() => handleClickFacility(facility)}
          >
            {mode === 'edit' && (
              <>
                <input
                  className="w-full rounded border border-neutral-200 px-1 text-sm"
                  value={facility.name}
                  onChange={(e) => handleChangeAdditionalData(facility.id, 'name', e.target.value)}
                  onClickCapture={(e) => e.stopPropagation()}
                />
                <select
                  className="w-full rounded border border-neutral-200 text-sm"
                  value={facility.type}
                  onChange={(e) =>
                    handleChangeAdditionalData(facility.id, 'type', Number(e.target.value))
                  }
                >
                  <option value={Model.FacilityType.MEETING_ROOM}>회의실</option>
                  <option value={Model.FacilityType.SEAT}>좌석</option>
                  <option value={Model.FacilityType.NONE}>기타</option>
                </select>
              </>
            )}
            {mode === 'select' && <Text fontSize="14">{facility.name}</Text>}
          </div>
        </div>
      ))}
    </GridLayout>
  );
}

export default FacilityGridEditor;
