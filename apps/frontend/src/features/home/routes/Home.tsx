import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Model } from '@slavseat/types';
import { Drawer } from 'vaul';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { Badge, Status } from '@/shared/components/Badge';
import { Button } from '@/shared/components/Button';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import ScrollArea from '@/shared/components/ScrollArea';
import { Toggle } from '@/shared/components/Toggle';
import { useControlled } from '@/shared/hooks/useControlled';
import { hideScrollBar } from '@/shared/styles/global-style.css';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

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

interface ReserveDrawerProps {
  open: boolean;
  onClose?: () => void;
  reserves?: Model.ReserveInfo[];
  facility?: Model.FacilitySummary;
}
function ReserveDrawer({
  open,
  reserves,
  facility,
  onClose,
}: ReserveDrawerProps) {
  const [step, setStep] = useState<'info' | 'reserve'>('info');

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-2xl bg-white shadow-blur">
          <div className="p-8">
            <div className="flex justify-between">
              <div>
                <Badge
                  status={
                    reserves?.length
                      ? Status.USING
                      : Status.ABLE_RESERVE
                  }
                />
                <div className="text-2xl font-medium">
                  {facility?.name} {step === 'info' && '예약 현황'}
                </div>
                <div className="text-sm font-medium text-neutral-400">
                  {reserves?.length
                    ? ''
                    : '사용중이지 않은 좌석입니다.'}
                </div>
              </div>
              <Toggle.Root className="m-auto mr-0">
                <Toggle.Item value="always">고정석</Toggle.Item>
                <Toggle.Item value="period">시간차</Toggle.Item>
              </Toggle.Root>
            </div>
            {step === 'info' && (
              <>
                <div>
                  {reserves?.map((reserve) => (
                    <div key={reserve.id}>
                      <span>{reserve.user.name}</span>
                      <span>
                        {reserve.end ? (
                          <>
                            {getHHMM(reserve.start)}~
                            {getHHMM(reserve.end)}
                          </>
                        ) : (
                          '고정석'
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full mt-8 py-3.5 rounded-2xl bg-neutral-200 text-black font-medium text-xs active:bg-neutral-300 transition-colors"
                  onClick={() => setStep('reserve')}
                >
                  예약 화면으로
                </button>
              </>
            )}
            {step === 'reserve' && (
              <form>
                <div className="flex my-8 gap-2 items-center justify-center">
                  <input
                    type="time"
                    className="px-2 border-2 rounded-md border-neutral-200"
                  />
                  <span className="text-sm">부터</span>
                  <input
                    type="time"
                    className="px-2 border-2 rounded-md border-neutral-200"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-3 rounded-2xl bg-neutral-200 text-black font-medium text-sm active:bg-neutral-300 transition-colors">
                    고정석 예약
                  </button>
                  <button className="flex-1 px-4 py-3 rounded-2xl bg-primary text-white font-medium text-sm transition-colors">
                    좌석 예약
                  </button>
                </div>
              </form>
            )}
          </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function Home() {
  const [selectedFacility, setSelectedFacility] =
    useState<Model.FacilitySummary>();

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
            onClickFacility={setSelectedFacility}
          />
        </ScrollArea>
      )}
      <ReserveDrawer
        open={!!selectedFacility && !!reservesByDate}
        onClose={() => setSelectedFacility(undefined)}
        facility={selectedFacility}
        reserves={reservesByDate?.filter(
          (reserve) => reserve.id === selectedFacility?.id,
        )}
      />
    </div>
  );
}

export default Home;
