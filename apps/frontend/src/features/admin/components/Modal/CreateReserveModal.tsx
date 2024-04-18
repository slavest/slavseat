import React, { useCallback, useMemo, useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import {
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';
import { format, parse } from 'date-fns';
import debounce from 'lodash/debounce';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetFloorDetailQuery } from '@/shared/api/query/floor/get-floor-detail';
import { useAddAdminReserveMutation } from '@/shared/api/query/reserve/add-admin-reserve';
import { useAddReserveMutation } from '@/shared/api/query/reserve/add-reserve';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Modal } from '@/shared/components/Modal';
import { ModalRootProps } from '@/shared/components/Modal/components/Modal';
import ScrollArea from '@/shared/components/ScrollArea';
import { formatHHMM } from '@/shared/constants/date.constant';
import { hideScrollBar } from '@/shared/styles/global-style.css';
import { cn } from '@/shared/utils/class.util';

import { useSearchQuery } from '../../hooks/search-user';

interface CreateReserveSelectStepData {
  date: Date;
  facility: Model.FacilitySummary;
  user: Model.UserInfo;
}
interface CreateReserveSelectStepProps {
  onSubmit?: (data: CreateReserveSelectStepData) => void;
}

function CreateReserveSelectStep({
  onSubmit,
}: CreateReserveSelectStepProps) {
  const [userSearch, setUserSearch] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<Model.UserInfo>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedFloor, setSelectedFloor] = useState<number>();
  const [selectedFacility, setSelectedFacility] =
    useState<Model.FacilitySummary>();

  // TODO: [스파게티 한접시] 컴포넌트에서 훅 호출 안하게 수정...
  const { data: reservesByDate } = useGetReserveByDate(selectedDate);
  const { data: searchedUser } = useSearchQuery(userSearch);
  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: createFloorDetail } = useGetFloorDetailQuery(
    selectedFloor!,
    {
      enabled: selectedFloor !== undefined,
    },
  );

  const handleChangeUserSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserSearch(e.target.value);
    },
    500,
  );

  const handleSelectUser = useCallback(
    (user: Model.UserInfo) => {
      let newSelectedUser;
      if (selectedUser?.id === user.id) newSelectedUser = undefined;
      else newSelectedUser = user;

      if (newSelectedUser !== undefined) setUserSearch('');

      setSelectedUser(newSelectedUser);
    },
    [selectedUser?.id],
  );

  const handleClickFacility = useCallback(
    (facility: Model.FacilitySummary) => {
      if (facility.type !== Model.FacilityType.SEAT) return;
      setSelectedFacility((prev) => {
        if (prev?.id === facility.id) return undefined;
        else return facility;
      });
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (!selectedUser || !selectedFacility)
      return toast.error('입력값을 다시 확인해 주세요');
    return onSubmit?.({
      date: selectedDate,
      user: selectedUser,
      facility: selectedFacility,
    });
  }, [onSubmit, selectedDate, selectedFacility, selectedUser]);

  return (
    <>
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex flex-col">
          <span>유저 선택</span>
          <input
            type="text"
            className="border border-neutral-400 rounded-md text-sm p-1 focus:outline-purple-600"
            placeholder="유저명 검색"
            onChange={(e) => setUserSearch(e.target.value)}
            value={userSearch}
          />
          {selectedUser && (
            <>
              <div
                className={cn(
                  'px-2 py-1 my-1 border border-neutral-200 rounded-md cursor-pointer',
                  'border-violet-600',
                )}
                onClick={() => handleSelectUser(selectedUser)}
              >
                {selectedUser.name}
              </div>
              <hr />
            </>
          )}
          <ul
            className={cn(
              'flex flex-col gap-1 my-2 max-h-48 overflow-y-scroll',
              hideScrollBar,
            )}
          >
            {searchedUser?.map((user) => (
              <li
                key={user.id}
                className={cn(
                  'px-2 py-1 border border-neutral-200 rounded-md cursor-pointer',
                  {
                    'border-violet-600': selectedUser?.id === user.id,
                  },
                )}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <span>날짜 선택</span>
          <input
            className="border border-neutral-400 rounded-md text-sm p-1 focus:outline-purple-600"
            type="date"
            value={format(selectedDate, 'yyy-MM-dd')}
            onChange={(e) =>
              setSelectedDate(
                parse(e.target.value, 'yyyy-MM-dd', new Date()),
              )
            }
          />
        </div>

        <div className="flex flex-col">
          <span>층 선택</span>
          <select
            className="border border-neutral-400 rounded-md text-sm p-1 focus:outline-purple-600"
            onChange={(e) =>
              setSelectedFloor(
                e.target.value === ''
                  ? undefined
                  : Number(e.target.value),
              )
            }
          >
            <option value="" key="">
              층을 선택해 주세요
            </option>
            {allFloorSummary?.map((floor) => (
              <option value={floor.id} key={floor.id}>
                {floor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-[25rem] h-[25rem]">
        {createFloorDetail && reservesByDate && (
          <TransformWrapper
            minScale={0.5}
            maxScale={1}
            disablePadding
            centerOnInit
          >
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
            >
              <FacilityGridViewer
                onClickFacility={handleClickFacility}
                selected={[selectedFacility?.id ?? -1]}
                facilities={createFloorDetail.facilities}
                reserves={reservesByDate}
              />
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>

      <div className="w-full flex justify-end">
        <button
          className="px-4 py-2 text-white bg-violet-600 rounded-xl"
          onClick={handleSubmit}
        >
          다음
        </button>
      </div>
    </>
  );
}

interface CreateReserve2StepProps {
  date: Date;
  onSubmit?: (data: {
    always: boolean;
    start: Date;
    end: Date;
  }) => void;
}

function CreateReserve2Step({
  date,
  onSubmit,
}: CreateReserve2StepProps) {
  const [always, setAlways] = useState(false);
  const [start, setStart] = useState<Date>(date);
  const [end, setEnd] = useState<Date>(date);

  return (
    <div className="flex flex-col gap-4 text-xs">
      <div className="flex gap-2">
        <span>고정석 여부</span>
        <input
          type="checkbox"
          checked={always}
          onChange={(e) => setAlways(e.target.checked)}
        />
      </div>

      <div className="flex flex-col">
        <span>시작 시간</span>
        <input
          type="time"
          value={format(start, formatHHMM)}
          onChange={(e) =>
            setStart(parse(e.target.value, formatHHMM, date))
          }
          className="border border-neutral-400 rounded-md text-sm p-1 py-0 focus:outline-purple-600"
        />
      </div>

      <div className={cn('flex flex-col', { 'opacity-50': always })}>
        <span>종료 시간</span>
        <input
          type="time"
          disabled={always}
          value={format(end, formatHHMM)}
          onChange={(e) =>
            setEnd(parse(e.target.value, formatHHMM, date))
          }
          className="border border-neutral-400 rounded-md text-sm p-1 py-0 focus:outline-purple-600"
        />
      </div>

      <div className="w-full flex justify-end">
        {/* <button className="">이전</button> */}
        <button
          className="px-4 py-2 text-white bg-violet-600 rounded-xl"
          onClick={() => onSubmit?.({ always, start, end })}
        >
          예약
        </button>
      </div>
    </div>
  );
}

interface CreateReserveModalProps extends ModalRootProps {}

export function CreateReserveModal({
  onClose,
  ...rest
}: CreateReserveModalProps) {
  const [step, setStep] = useState(0);

  const [user, setUser] = useState<Model.UserInfo>();
  const [facility, setFacility] = useState<Model.FacilitySummary>();
  const [date, setDate] = useState<Date>();

  const { mutate: addAdminReserveMutation, loading: mutateLoading } =
    useAddAdminReserveMutation({
      onSuccess: () => {
        toast.success('좌석 예약이 등록되었습니다');
        onClose?.();
      },
      onError: (error) => {
        toast.error(
          error.response?.data.message.replace('.', '.\n') ||
            '에러가 발생 했습니다.',
        );
      },
    });

  const handleSubmitSelectStep = useCallback(
    (data: CreateReserveSelectStepData) => {
      setUser(data.user);
      setFacility(data.facility);
      setDate(data.date);
      setStep(1);
    },
    [],
  );

  return (
    <Modal.Root
      closeOnBackdropClick={false}
      onClose={onClose}
      {...rest}
    >
      <div className="space-y-4">
        <div className="flex justify-between font-semibold">
          예약 추가
          <Modal.CloseButton />
        </div>
        {step === 0 && (
          <CreateReserveSelectStep
            onSubmit={handleSubmitSelectStep}
          />
        )}
        {step === 1 && date && (
          <CreateReserve2Step
            date={date}
            onSubmit={(d) =>
              addAdminReserveMutation({
                ...d,
                end: d.always ? undefined : d.end,
                userId: user!.id,
                facilityId: facility!.id,
              })
            }
          />
        )}
      </div>
    </Modal.Root>
  );
}
