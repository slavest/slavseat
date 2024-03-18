import React, { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import ScrollArea from '@/shared/components/ScrollArea';
import { useControlled } from '@/shared/hooks/useControlled';
import { hideScrollBar } from '@/shared/styles/global-style.css';

function DatePicker() {
  return (
    <div className="mx-4 py-2 bg-neutral-100 rounded-2xl flex justify-center gap-1">
      <div className="w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]">
        <div className="text-[0.5rem] font-normal text-neutral-400">
          일
        </div>
        <div className="text-sm font-medium">1</div>
      </div>
      <div className="w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]">
        <div className="text-[0.5rem] font-normal text-neutral-400">
          월
        </div>
        <div className="text-sm font-medium">2</div>
      </div>
      <div className="w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]">
        <div className="text-[0.5rem] font-normal text-neutral-400">
          화
        </div>
        <div className="text-sm font-medium">3</div>
      </div>
      <div className="w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]">
        <div className="text-[0.5rem] font-normal text-neutral-400">
          수
        </div>
        <div className="text-sm font-medium">4</div>
      </div>
      <div className="w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]">
        <div className="text-[0.5rem] font-normal text-neutral-400">
          목
        </div>
        <div className="text-sm font-medium">5</div>
      </div>
      <div className="w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]">
        <div className="text-[0.5rem] font-normal text-neutral-400">
          금
        </div>
        <div className="text-sm font-medium">6</div>
      </div>
      <div className="w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px] bg-primary text-white">
        <div className="text-[0.5rem] font-normal">토</div>
        <div className="text-sm font-medium">7</div>
      </div>
    </div>
  );
}

// FIXME: 대충 구현한 탭 UI, 제대로 컴포넌트로 다시 구현 필요
interface TabItem {
  value: string;
  label: string;
}
interface TabProps {
  items: TabItem[];
  selected?: string | null;
  onChange?: (value: string | null) => void;
}
function Tab({ items, selected: selectedProp, onChange }: TabProps) {
  const [selected, setSelected] = useControlled(null, selectedProp);

  const handleClickItem = useCallback(
    (item: TabItem) => {
      let newSelect;
      if (selected === item.value) newSelect = null;
      else newSelect = item.value;

      setSelected(newSelect);
      onChange?.(newSelect);
    },
    [onChange, selected, setSelected],
  );

  return (
    <div
      className={clsx(
        'flex overflow-x-scroll gap-4 px-8 border-b border-neutral-200',
        hideScrollBar,
      )}
    >
      {items.map((item) => (
        <div
          key={item.value}
          className={clsx('px-2 py-3 text-nowrap', {
            'text-neutral-400': item.value !== selected,
            'text-black border-b-2 border-black':
              item.value === selected,
          })}
          onClick={() => handleClickItem(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

function Home() {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(
    null,
  );

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: floorDetail } = useGetFloorDetailQuery(
    selectedFloor!,
    {
      enabled: selectedFloor !== null,
    },
  );

  useEffect(() => {
    if (allFloorSummary) {
      setSelectedFloor(allFloorSummary.at(0)?.id ?? null);
    }
  }, [allFloorSummary]);

  return (
    <div className="h-full flex flex-col">
      <div>
        <div className="px-6 py-6 text-xl font-bold">좌석 배치도</div>
        <DatePicker />
        {allFloorSummary && (
          <Tab
            selected={selectedFloor?.toString() ?? null}
            items={allFloorSummary.map((floor) => ({
              value: floor.id.toString(),
              label: floor.name,
            }))}
            onChange={(v) => v && setSelectedFloor(+v)}
          />
        )}
      </div>
      {floorDetail && (
        <ScrollArea>
          <FacilityGridViewer
            facilities={floorDetail.facilities}
            reserves={[]}
          />
        </ScrollArea>
      )}
    </div>
  );
}

export default Home;
