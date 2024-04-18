import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';
import { format, formatDate, parse } from 'date-fns';

import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { useGetReserveByDate } from '@/shared/api/query/reserve/get-reserve-by-date';
import { ColumnType, Table } from '@/shared/components/Table';
import { formatMMDDHHMM } from '@/shared/constants/date.constant';
import { cn } from '@/shared/utils/class.util';

import { Box } from '../components/Box';
import { CreateReserveModal } from '../components/Modal/CreateReserveModal';
import { useCancelReserveMutation } from '../hooks/cancel-reserve';
import { useAdminAppStore } from '../stores/adminAppStore';

const columns: ColumnType<Model.ReserveInfo>[] = [
  { dataKey: 'user.name', headerContent: '사용자명', flexGrow: 1 },
  {
    dataKey: 'start',
    headerContent: '시작 시간',
    flexGrow: 1,
    renderContent: ({ start }) => formatDate(start, formatMMDDHHMM),
  },
  {
    dataKey: 'end',
    headerContent: '종료 시간',
    flexGrow: 1,
    renderContent: ({ end }) =>
      end ? formatDate(end, formatMMDDHHMM) : null,
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
    renderContent: ({ createdAt }) =>
      format(createdAt, 'yyyy-MM-dd HH:MM:SS'),
  },
  {
    dataKey: 'facility',
    headerContent: '좌석 정보',
    flexGrow: 1,
    renderContent: ({ facility }) =>
      `${facility.floor.name} ${facility.name}`,
  },
];

export function AdminReserveManage() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('예약 관리'), [setTitle]);

  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);
  const facilityElementRef = useRef<Record<number, HTMLDivElement>>(
    {},
  );
  const [date, setDate] = useState<Date>(new Date());
  const [searchUserName, setSearchUserName] = useState<string>('');
  const [searchFloorId, setSearchFloorId] = useState<number>();
  const [selectedReserve, setSelectedReserve] =
    useState<Model.ReserveInfo>();
  const [adminReserveModalOpen, setAdminReserveModalOpen] =
    useState(false);

  const { mutate: cancleReserveMutation } = useCancelReserveMutation({
    onSuccess: () => toast.success('예약이 취소되었습니다.'),
    onError: (e) => toast.error(e.response?.data.message),
  });

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();
  const { data: reserveList } = useGetReserveByDate(date);

  const filteredReserveList = useMemo(
    () =>
      reserveList
        ?.filter((reserve) =>
          searchUserName === ''
            ? true
            : reserve.user.name.includes(searchUserName),
        )
        .filter((reserve) =>
          searchFloorId === undefined
            ? true
            : reserve.facility.floor.id === searchFloorId,
        ),
    [reserveList, searchFloorId, searchUserName],
  );

  const addFacilityRef = useCallback(
    (id: number, ref: HTMLDivElement | null) => {
      if (ref) facilityElementRef.current[id] = ref;
    },
    [],
  );

  const handleClickReserve = useCallback(
    (reserve: Model.ReserveInfo) => {
      if (reserve.id === selectedReserve?.id) {
        setSelectedReserve(undefined);
        return;
      }

      const element = facilityElementRef.current[reserve.facility.id];
      if (transformRef.current && element) {
        setSelectedReserve(reserve);
        transformRef.current.zoomToElement(element, 1, 150);
      }
    },
    [selectedReserve?.id],
  );

  const handleClickCancelReserve = useCallback(() => {
    if (!selectedReserve) return alert('선택된 예약이 없습니다.');
    cancleReserveMutation(selectedReserve.id);
    setSelectedReserve(undefined);
  }, [cancleReserveMutation, selectedReserve]);

  return (
    <div className="flex flex-col p-4 gap-4 h-[calc(100vh_-_var(--var-admin-header-height))] overflow-hidden">
      <div className="flex gap-4">
        <Box
          title="필터"
          className="flex-1"
          innerClassName={cn('flex gap-4')}
          fullWidth
        >
          <span>
            <div className="text-xs">날짜</div>
            <input
              type="date"
              value={format(date, 'yyyy-MM-dd')}
              onChange={(e) =>
                setDate(
                  parse(e.target.value, 'yyyy-MM-dd', new Date()),
                )
              }
              className="text-sm border border-neutral-400 rounded-md p-1 focus:outline-purple-600"
            />
          </span>

          <span>
            <div className="text-xs">층</div>
            <select
              className="border border-neutral-400 rounded-md text-sm p-1 focus:outline-purple-600"
              value={searchFloorId}
              onChange={(e) =>
                setSearchFloorId(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            >
              <option value="" key="">
                전체
              </option>
              {allFloorSummary?.map((floor) => (
                <option value={floor.id} key={floor.id}>
                  {floor.name}
                </option>
              ))}
            </select>
          </span>

          <span>
            <div className="text-xs">사용자명</div>
            <input
              type="text"
              className="border border-neutral-400 rounded-md text-sm p-1 focus:outline-purple-600"
              value={searchUserName}
              onChange={(e) => setSearchUserName(e.target.value)}
            />
          </span>
        </Box>

        <Box title="동작">
          <button
            className="px-4 py-2 text-white bg-violet-600 rounded-xl"
            onClick={() => setAdminReserveModalOpen(true)}
          >
            새 예약
          </button>
        </Box>
      </div>
      {/* <ScrollArea> */}
      <div className="flex-1">
        <Table
          data={filteredReserveList}
          columns={columns}
          fillHeight
        />
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
    </div>
  );
}
