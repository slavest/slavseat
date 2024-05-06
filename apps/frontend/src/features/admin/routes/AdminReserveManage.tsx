import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';
import { format, formatDate, parse } from 'date-fns';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetReserveByRangeDate } from '@/shared/api/query/reserve/get-reserve-by-range-date';
import { RangeParams } from '@/shared/api/reserve';
import { ColumnType, Table } from '@/shared/components/Table';
import { formatFullDay } from '@/shared/constants/date.constant';
import { cn } from '@/shared/utils/class.util';

import {
  ManageReserveMenu,
  ManageReserveMenuActionType,
} from '../components/Dropdown/ManageReserveMenu';
import { CreateReserveModal } from '../components/Modal/CreateReserveModal';
import { ReserveExcelDownload } from '../components/ReserveExcelDownload';
import { useCancelReserveMutation } from '../hooks/cancel-reserve';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminReserveManage() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('예약 관리'), [setTitle]);

  const { watch, setValue } = useForm<RangeParams>({
    defaultValues: { startDate: new Date(), endDate: new Date() },
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const [searchUserName, setSearchUserName] = useState<string>('');
  const [searchId, setSearchId] = useState<string>('');
  const [searchFloorId, setSearchFloorId] = useState<number>();
  const [adminReserveModalOpen, setAdminReserveModalOpen] = useState(false);
  // const [viewFacilityInGrid, setViewFacilityInGrid] = useState<Model.FacilitySummary>();

  const { mutate: cancleReserveMutation } = useCancelReserveMutation({
    onSuccess: () => toast.success('예약이 취소되었습니다.'),
    onError: (e) => toast.error(e.response?.data.message),
  });

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: reserveList } = useGetReserveByRangeDate({ startDate, endDate });

  const filteredReserveList = useMemo(
    () =>
      reserveList
        ?.filter((reserve) =>
          searchUserName === '' ? true : reserve.user.name.includes(searchUserName),
        )
        .filter((reserve) => (searchId === '' ? true : reserve.id.toString() === searchId))
        .filter((reserve) =>
          searchFloorId === undefined ? true : reserve.facility.floor.id === searchFloorId,
        ),
    [reserveList, searchFloorId, searchId, searchUserName],
  );

  const handleChangeStartDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStartDate = parse(event.target.value, 'yyyy-MM-dd', new Date());

      if (!endDate || endDate.getTime() < newStartDate.getTime()) {
        setValue('endDate', parse(event.target.value, 'yyyy-MM-dd', new Date()));
      }

      setValue('startDate', newStartDate);
    },
    [endDate, setValue],
  );

  const handleChangeEndDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('endDate', parse(event.target.value, 'yyyy-MM-dd', new Date()));
    },
    [setValue],
  );

  const handleReserveAction = useCallback(
    (action: ManageReserveMenuActionType, reserve: Model.ReserveInfo) => {
      if (action.type === 'cancleReserve') cancleReserveMutation(reserve.id);
    },
    [cancleReserveMutation],
  );

  const columns: ColumnType<Model.ReserveInfo>[] = [
    { dataKey: 'id', headerContent: '예약 번호', flexGrow: 0.35, align: 'center' },
    { dataKey: 'user.name', headerContent: '사용자명', flexGrow: 1, fullText: true },
    {
      dataKey: 'start',
      headerContent: '사용 시작 시간',
      flexGrow: 1,
      renderContent: ({ start }) => formatDate(start, formatFullDay),
    },
    {
      dataKey: 'end',
      headerContent: '사용 종료 시간',
      flexGrow: 1,
      renderContent: ({ end }) => (end ? formatDate(end, formatFullDay) : null),
    },
    {
      dataKey: 'always',
      headerContent: '예약 유형',
      flexGrow: 1,
      renderContent: ({ always }) => (
        <span
          className={cn({
            'text-blue-600': !always,
            'text-red-600': always,
          })}
        >
          {always ? '고정석' : '시간차'}
        </span>
      ),
    },
    {
      dataKey: 'createdAt',
      headerContent: '예약 일시',
      flexGrow: 1,
      renderContent: ({ createdAt }) => format(createdAt, 'yyyy-MM-dd HH:MM:SS'),
    },
    {
      dataKey: 'facility',
      headerContent: '좌석 정보',
      flexGrow: 1,
      renderContent: ({ facility }) => `${facility.floor.name} ${facility.name}`,
    },
    {
      dataKey: '',
      headerContent: '',
      flexGrow: 0.3,
      renderContent: (reserve) => (
        <ManageReserveMenu onAction={(action) => handleReserveAction(action, reserve)} />
      ),
    },
  ];

  return (
    <div className="flex h-[calc(100vh_-_var(--var-admin-header-height))] flex-col gap-4 overflow-hidden p-4">
      <div className={cn('flex gap-4', 'bg-white', 'rounded-lg', 'shadow-sm')}>
        <div className={cn('flex flex-wrap items-center', 'gap-4', 'px-6 py-4')}>
          <span>
            <div className="text-xs">날짜</div>

            <div className={cn('flex items-center gap-x-2')}>
              <input
                className={cn(
                  'h-9',
                  'px-3',
                  'rounded-md border border-neutral-400 text-sm focus:outline-purple-600',
                )}
                type="date"
                value={format(startDate, 'yyyy-MM-dd')}
                onChange={handleChangeStartDate}
              />
              ~
              <input
                className={cn(
                  'h-9',
                  'px-3',
                  'rounded-md border border-neutral-400 text-sm focus:outline-purple-600',
                )}
                type="date"
                value={format(endDate, 'yyyy-MM-dd')}
                onChange={handleChangeEndDate}
              />
            </div>
          </span>

          <span>
            <div className="text-xs">층</div>
            <select
              className={cn(
                'h-9',
                'px-3',
                'rounded-md border border-neutral-400 text-sm focus:outline-purple-600',
              )}
              value={searchFloorId}
              onChange={(e) =>
                setSearchFloorId(e.target.value ? Number(e.target.value) : undefined)
              }
            >
              <option key="" value="">
                전체
              </option>
              {allFloorSummary?.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </span>

          <span>
            <div className="text-xs">사용자명</div>
            <input
              className={cn(
                'h-9',
                'px-3',
                'rounded-md border border-neutral-400 text-sm focus:outline-purple-600',
              )}
              type="text"
              value={searchUserName}
              onChange={(e) => setSearchUserName(e.target.value)}
            />
          </span>

          <span>
            <div className="text-xs">예약 번호</div>
            <input
              className={cn(
                'h-9 w-[5rem]',
                'px-3',
                'rounded-md border border-neutral-400 text-sm focus:outline-purple-600',
              )}
              type="number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </span>

          <div className={cn('w-fit', 'px-4 py-2', 'bg-white')}>
            검색된 데이터{' '}
            <span className="font-semibold text-purple-800">{filteredReserveList?.length}개</span>
          </div>
        </div>

        <div className={cn('flex items-center gap-x-4', 'pl-6', 'border-l')}>
          <ReserveExcelDownload columns={columns} data={filteredReserveList} />

          <button
            className="rounded-xl bg-violet-600 px-4 py-2 text-white"
            onClick={() => setAdminReserveModalOpen(true)}
          >
            새 예약
          </button>
        </div>
      </div>

      {/* <ScrollArea> */}
      <div className={cn('flex-1', 'bg-white', 'rounded-lg', 'shadow-sm')}>
        <Table fillHeight columns={columns} data={filteredReserveList} rowHeight={40} />
      </div>
      {/* </ScrollArea> */}

      {/* {floorDetail && (
          <Box
            title="Facility Grid 뷰"
            className="flex-1 w-1"
            innerPadding={false}
            fullWidth
          >
            <TransformWrapper
              minScale={0.5}
              maxScale={1}
              disablePadding
              centerOnInit
              ref={transformRef}
            >
              <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%' }}
              >
                <FacilityGridViewer
                  selected={
                    selectedReserve && [selectedReserve?.facility.id]
                  }
                  onItemRender={(facility, ref) =>
                    addFacilityRef(facility.id, ref)
                  }
                  facilities={floorDetail?.facilities}
                  reserves={[]}
                />
              </TransformComponent>
            </TransformWrapper>
          </Box>
        )} */}
      <CreateReserveModal
        open={adminReserveModalOpen}
        onClose={() => setAdminReserveModalOpen(false)}
      />
      {/* {viewFacilityInGrid && <ViewFacilityInGrid facilities={}/>} */}
    </div>
  );
}
