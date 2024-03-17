import React, { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';

import { useGetAllFloorSummaryQuery } from '@/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/api/query/floor/get-floor-detail';
import ScrollArea from '@/components/atoms/ScrollArea';
import FacilityGridViewer from '@/components/molecules/FacilityGridViewer';
import { hideScrollBar } from '@/global-style.css';
import { useControlled } from '@/hooks/useControlled';

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
        'flex overflow-x-scroll space-x-4 px-8 border-b border-neutral-200',
        hideScrollBar,
      )}
    >
      {items.map((item) => (
        <div
          key={item.value}
          className={clsx(
            'inline-block px-2 py-3 text-neutral-400 text-nowrap',
            {
              'text-black border-b-2 border-black':
                item.value === selected,
            },
          )}
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
    <div>
      <div className="mx-6 my-6 text-xl font-bold">좌석 배치도</div>
      <DatePicker />
      {allFloorSummary && (
        <Tab
          selected={selectedFloor?.toString()}
          items={allFloorSummary.map((floor) => ({
            value: floor.id.toString(),
            label: floor.name,
          }))}
          onChange={(v) => v && setSelectedFloor(+v)}
        />
      )}
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
