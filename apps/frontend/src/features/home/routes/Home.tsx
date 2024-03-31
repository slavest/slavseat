import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CgSpinner } from 'react-icons/cg';
import {
  MiniMap,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';
import { FacilityType } from '@slavseat/types/src/model';
import { parse } from 'date-fns';
import { Drawer } from 'vaul';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useAddReserveMutation } from '@/shared/api/query/reserve/add-reserve';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { Badge, Status } from '@/shared/components/Badge';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Toggle } from '@/shared/components/Toggle';
import { useControlled } from '@/shared/hooks/useControlled';
import { hideScrollBar } from '@/shared/styles/global-style.css';
import { cn } from '@/shared/utils/class.util';
import { getHHMM } from '@/shared/utils/date.util';

const DayString = ['일', '월', '화', '수', '목', '금', '토'];
const getWeek = (date: Date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(
    (date.getTime() - onejan.getTime()) / 86400000 / 7,
  );
};
const getStartOfWeek = (week: number) => {
  const onejan = new Date(new Date().getFullYear(), 0, 1);
  return new Date(onejan.getTime() + 86400000 * 7 * (week - 1));
};
const isCurrentReserve = (reserve: Model.ReserveInfo) =>
  new Date(reserve.start).getTime() <= Date.now() &&
  (reserve.always ||
    reserve.end === undefined ||
    (reserve.end && new Date(reserve.end).getTime() >= Date.now()));

interface DateItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  selected?: boolean;
  disabled?: boolean;
}
function DateItem({
  date,
  selected = false,
  disabled = false,
  className,
  onClick,
  ...rest
}: DateItemProps) {
  return (
    <div
      className={cn(
        'w-10 h-10 text-center flex flex-col items-center justify-center rounded-[10px]',
        {
          'bg-primary text-white': selected,
          'opacity-50': disabled,
        },
        className,
      )}
      onClick={(e) => !disabled && onClick?.(e)}
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
          disabled={
            !isSameDate(date, new Date()) &&
            Date.now() >= date.getTime()
          }
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
        'flex overflow-x-scroll gap-4 px-8 border-b border-neutral-200 touch-pan-x',
        hideScrollBar,
      )}
    >
      {items.map((item) => (
        <div
          key={item.value}
          className={cn('px-2 py-3 text-nowrap font-medium', {
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

interface ReserveData {
  start: Date;
  end?: Date;
  always: boolean;
  facilityId: number;
}
interface ReserveDrawerProps {
  open: boolean;
  reserves?: Model.ReserveInfo[];
  facility?: Model.FacilitySummary;
  onClose?: () => void;
  onSubmit?: (data: ReserveData) => void;
}
function ReserveDrawer({
  open,
  reserves,
  facility,
  onClose,
  onSubmit,
}: ReserveDrawerProps) {
  const [step, setStep] = useState<'info' | 'reserve'>('info');
  const [reserveType, setReserveType] = useState<'always' | 'period'>(
    'period',
  );

  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();

  const handleSubmitForm = useCallback<
    React.FormEventHandler<HTMLFormElement>
  >(
    (e) => {
      e.preventDefault();
      if (!facility || !start) return;

      onSubmit?.({
        start,
        end,
        always: reserveType === 'always',
        facilityId: facility.id,
      });
    },
    [end, facility, onSubmit, reserveType, start],
  );

  const handleClose = useCallback(() => {
    setStep('info');
    setReserveType('period');
    setStart(undefined);
    setEnd(undefined);
    onClose?.();
  }, [onClose]);

  const currentReserve = useMemo(() => {
    const current = reserves?.filter(isCurrentReserve).at(0);

    return current;
  }, [reserves]);

  const isFutureReserved = useMemo(
    () =>
      Boolean(
        reserves?.filter(
          (reserve) =>
            new Date(reserve.start).getTime() >= Date.now(),
        ).length,
      ),
    [reserves],
  );

  return (
    <Drawer.Root open={open} onClose={handleClose}>
      <Drawer.Portal>
        <Drawer.Content className="max-w-[50rem] mx-auto fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-2xl bg-white shadow-blur outline-none">
          <div className="p-8">
            <div className="flex justify-between">
              <div>
                {/* 현재 보는 좌석의 Status 표시 */}
                <Badge
                  status={
                    currentReserve
                      ? Status.USING
                      : isFutureReserved
                        ? Status.RESERVED
                        : Status.ABLE_RESERVE
                  }
                />
                <div className="text-2xl font-medium">
                  {facility?.name}
                  {/* 현재 step에 따라 다른 텍스트 표시 */}
                  {step === 'info' && ' 예약 현황'}
                  {step === 'reserve' && ' 예약'}
                </div>
                <div className="text-sm font-medium text-neutral-400">
                  {/* 지금 시간을 기준으로 예약이 있는지 표시 */}
                  {currentReserve
                    ? `${currentReserve.user.name} 님이 현재 사용중입니다.`
                    : '사용중이지 않은 좌석입니다.'}
                </div>
              </div>
              {/* 예약 유형 변경 토글 */}
              {step === 'reserve' && (
                <Toggle.Root
                  className="m-auto mr-0"
                  value={reserveType}
                  onChange={(v) =>
                    setReserveType(v as typeof reserveType)
                  }
                >
                  <Toggle.Item value="period">시간차</Toggle.Item>
                  <Toggle.Item value="always">고정석</Toggle.Item>
                </Toggle.Root>
              )}
            </div>

            {/* info 스텝일때 표시할 내용 */}
            {step === 'info' && (
              <>
                <div className="my-4 space-y-2">
                  {/* 현재 좌석에 대한 예약들 표시 */}
                  {reserves?.map((reserve) => (
                    <div
                      key={reserve.id}
                      className={cn(
                        'flex justify-between px-6 py-3.5 border border-neutral-150 rounded-[10px] shadow-blur-sm text-sm font-medium',
                        {
                          'opacity-50':
                            reserve.end &&
                            new Date(reserve.end) <= new Date() &&
                            !reserve.always,
                        },
                      )}
                    >
                      <span>{reserve.user.name}</span>
                      <span>
                        {reserve.always ? (
                          '고정석'
                        ) : (
                          <span className="flex gap-1">
                            {getHHMM(new Date(reserve.start))}
                            <span>-</span>
                            {reserve.end &&
                              getHHMM(new Date(reserve.end))}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full mt-8 py-3 rounded-2xl bg-neutral-200 text-black font-medium text-sm active:bg-neutral-300 transition-colors"
                  onClick={() => setStep('reserve')}
                >
                  예약 화면으로
                </button>
              </>
            )}

            {/* reserve 스텝일때 표시할 내용 */}
            {step === 'reserve' && (
              <form onSubmit={handleSubmitForm}>
                <div className="flex my-10 gap-2 items-center justify-center">
                  <input
                    type="time"
                    className="px-2 border-2 rounded-md border-neutral-200"
                    onChange={(e) =>
                      setStart(
                        parse(e.target.value, 'HH:mm', new Date()),
                      )
                    }
                    required
                  />
                  <span className="text-sm">부터</span>
                  <input
                    type="time"
                    className={cn(
                      'px-2 border-2 rounded-md border-neutral-200',
                      { 'opacity-50': reserveType === 'always' },
                    )}
                    onChange={(e) =>
                      setEnd(
                        parse(e.target.value, 'HH:mm', new Date()),
                      )
                    }
                    disabled={reserveType === 'always'}
                    required={reserveType === 'period'}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    className="px-4 py-3 rounded-2xl bg-neutral-200 text-black font-medium text-sm active:bg-neutral-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setStep('info');
                    }}
                  >
                    예약 현황
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-2xl bg-primary text-white font-medium text-sm transition-colors"
                  >
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
  const { data: floorDetail, isLoading: isFloorDetailLoading } =
    useGetFloorDetailQuery(selectedFloor!, {
      enabled: selectedFloor !== null,
    });
  const { data: reservesByDate, isLoading: isReserveLoading } =
    useGetReserveByDate(selectedDate);

  const { mutate: addReserveMutation } = useAddReserveMutation({
    onSuccess: () => setSelectedFacility(undefined),
  });

  const handleSubmitReserve = useCallback(
    (data: ReserveData) => {
      data.start.setMonth(selectedDate.getMonth());
      data.start.setDate(selectedDate.getDate());

      data.end?.setMonth(selectedDate.getMonth());
      data.end?.setDate(selectedDate.getDate());

      addReserveMutation(data);
    },
    [addReserveMutation, selectedDate],
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
      {floorDetail && !isFloorDetailLoading && !isReserveLoading ? (
        <TransformWrapper
          minScale={0.5}
          maxScale={1}
          disablePadding
          centerOnInit
        >
          <TransformComponent wrapperClass="w-full h-full">
            <FacilityGridViewer
              className="w-full m-4"
              facilities={floorDetail.facilities}
              reserves={reservesByDate ?? []}
              onClickFacility={(d) =>
                d.type === FacilityType.SEAT && setSelectedFacility(d)
              }
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <div className="w-full h-full flex justify-center items-center ">
          <CgSpinner className="animate-spin w-5 h-5" />
        </div>
      )}
      <ReserveDrawer
        open={!!selectedFacility && !!reservesByDate}
        onClose={() => setSelectedFacility(undefined)}
        facility={selectedFacility}
        reserves={reservesByDate?.filter(
          (reserve) => reserve.facility.id === selectedFacility?.id,
        )}
        onSubmit={handleSubmitReserve}
      />
    </div>
  );
}

export default Home;
