import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import ScrollArea from '@/shared/components/ScrollArea';
import { useControlled } from '@/shared/hooks/useControlled';
import { hideScrollBar } from '@/shared/styles/global-style.css';
import { cn } from '@/shared/utils/class.util';

const DayString = ['일', '월', '화', '수', '목', '금', '토'];
const getWeek = (date: Date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 +
      onejan.getDay() +
      1) /
      7,
  );
};
const getStartOfWeek = (week: number) => {
  const onejan = new Date(new Date().getFullYear(), 0, 1);
  return new Date(onejan.getTime() + 86400000 * 7 * (week - 1));
};

interface DateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  selected?: boolean;
}
function DateItem({
  date,
  selected = false,
  className,
  ...rest
}: DateItemProps) {
  return (
    <div
      className={cn(
        'w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]',
        { 'bg-primary text-white': selected },
        className,
      )}
      {...rest}
    >
      <div
        className={cn('text-[0.5rem] font-normal text-neutral-400', {
          'text-white': selected,
        })}
      >
        {DayString[date.getDay()]}
      </div>
      <div className="text-sm font-medium">{date.getDate()}</div>
    </div>
  );
}

interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: Date;
  onSelect?: (date: Date) => void;
}
function DatePicker({
  className,
  selected: selectedProps,
  onSelect,
  ...rest
}: DatePickerProps) {
  const [selected, setSelected] = useControlled(
    new Date(),
    selectedProps,
  );
  const [week, setWeek] = useState(getWeek(new Date()));

  const handleClickDate = useCallback(
    (date: Date) => {
      setSelected(date);
      onSelect?.(date);
    },
    [onSelect, setSelected],
  );

  const dates = useMemo(() => {
    const startDate = new Date(
      getStartOfWeek(week).getTime() - 86400000,
    );

    return [
      startDate,
      ...new Array(6).fill(0).reduce((acc, _, i) => {
        return [
          ...acc,
          new Date(getStartOfWeek(week).getTime() + 86400000 * i),
        ];
      }, []),
    ] as Date[];
  }, [week]);

  // const [prevDate, nextDate] = useMemo(() => {
  //   return [
  //     dates.map((date) => new Date(date.getTime() - 86400000 * 7)),
  //     dates.map((date) => new Date(date.getTime() + 86400000 * 7)),
  //   ];
  // }, [dates]);

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div
      className={cn(
        'py-2 bg-neutral-100 rounded-2xl flex justify-center gap-1',
        className,
      )}
      {...rest}
    >
      {/* <div>
        {prevDate.map((date) => (
          <DateItem key={date.getTime()} date={date} />
        ))}
      </div> */}
      {dates.map((date) => (
        <DateItem
          key={date.getTime()}
          date={date}
          selected={isSameDate(date, selected)}
          onClick={() => handleClickDate(date)}
        />
      ))}
      {/* <div>
        {nextDate.map((date) => (
          <DateItem key={date.getTime()} date={date} />
        ))}
      </div> */}
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
      className={cn(
        'flex overflow-x-scroll gap-4 px-8 border-b border-neutral-200',
        hideScrollBar,
      )}
    >
      {items.map((item) => (
        <div
          key={item.value}
          className={cn('px-2 py-3 text-nowrap', {
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
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  const { data: reservesByDate } = useGetReserveByDate(selectedDate);

  useEffect(() => {
    if (allFloorSummary) {
      setSelectedFloor(allFloorSummary.at(0)?.id ?? null);
    }
  }, [allFloorSummary]);

  return (
    <div className="h-full flex flex-col">
      <div>
        <div className="px-6 py-6 text-xl font-bold">좌석 배치도</div>
        <DatePicker
          className="mx-4"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
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
            reserves={reservesByDate?.map((v) => v.id) ?? []}
          />
        </ScrollArea>
      )}
    </div>
  );
}

export default Home;
