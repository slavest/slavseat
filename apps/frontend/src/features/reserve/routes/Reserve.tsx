import React, { ComponentProps, PropsWithChildren, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaChevronDown } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';

import { Button } from '@/shared/components/Button';
import { Loading } from '@/shared/components/Loading';
import ScrollArea from '@/shared/components/ScrollArea';
import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

import { CancelReserveDrawer } from '../components/CancelReserveDrawer';
import { ErrorNotice } from '../components/ErrorNotice';
import { NotData } from '../components/NotData';
import { ReserveList, ReserveListItem } from '../components/ReserveList';
import { useReserve } from '../hooks/useReserve';
import { GroupedData } from '../types';
import { getSeatName, getYYYYMMDD } from '../utils/reserve.util';

function Container({ children, className, ...attr }: ComponentProps<'div'>) {
  return (
    <div className={cn('h-full w-full bg-neutral-100 px-10 py-16', className)} {...attr}>
      {children}
    </div>
  );
}

interface ContentProps {
  loading: boolean;
  notData: boolean;
}

function Content({ children, loading = false, notData = false }: PropsWithChildren<ContentProps>) {
  if (loading) return <Loading />;

  if (notData) return <NotData notDataPrefix="좌석 정보가" />;

  return children;
}

function Divide({ children }: PropsWithChildren) {
  return (
    <div className={cn('w-full', 'grid grid-cols-[1fr_max-content_1fr] items-center', 'px-1')}>
      <div className={cn('h-px', 'bg-neutral-200')} />
      <span className={cn('flex items-center gap-x-1', 'text-xs text-neutral-500', 'px-3')}>
        {children}
      </span>
      <div className={cn('h-px', 'bg-neutral-200')} />
    </div>
  );
}

function Reserve() {
  const [selectedReserve, setSelectedReserve] = useState<Model.ReserveInfo | null>(null);
  const [showReserveHistory, setShowReserveHistory] = useState(false);

  const { user } = useUserStore();

  const {
    alwayReserve,
    usingReserves,
    groupReserves,
    isError,
    isLoading,
    cancelReserve,
    cancelLoading,
  } = useReserve({
    onCancelSuccess: () => {
      toast.success('예약이 취소되었습니다.');
      setSelectedReserve(null);
    },
    onCancelError: (error) => {
      toast.error(error.response?.data?.message ?? '예약 취소에 실패했습니다.');
    },
  });

  const renderList = (groupedData?: GroupedData) => {
    return groupedData
      ? Object.entries(groupedData).map(([date, reserves]) => {
          return (
            <ReserveList
              key={date}
              reserves={reserves}
              title={date}
              onClickItem={setSelectedReserve}
            />
          );
        })
      : null;
  };

  if (isError) {
    return (
      <Container className="grid place-content-center">
        <ErrorNotice />
      </Container>
    );
  }

  return (
    <Container className="flex h-full flex-col overflow-hidden">
      <header className="mb-8">
        <h1 className="flex w-full flex-wrap items-center text-2xl font-bold">
          <p>{user?.name || <Loading />}</p>
          <p>님의 좌석 예약 현황</p>
        </h1>
        <p className="text-sm text-neutral-700">
          {usingReserves
            ? `현재 [${usingReserves
                .map((reserve) => getSeatName(reserve))
                .join(', ')}] 좌석을 이용 가능합니다.`
            : '현재 이용가능한 좌석이 없습니다.'}
        </p>
      </header>

      <ScrollArea className="">
        <section className="flex flex-col gap-y-6 px-1.5">
          <div className="flex flex-col gap-y-2">
            <span className={cn('text-xs font-semibold')}>고정석</span>

            {alwayReserve ? (
              <>
                <ReserveList reserves={[alwayReserve]} onClickItem={setSelectedReserve} />
              </>
            ) : (
              <ReserveListItem className={cn('bg-neutral-50', 'cursor-default', 'rounded-lg')}>
                사용가능한 고정 좌석이 존재하지 않습니다.
              </ReserveListItem>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <span className={cn('text-xs font-semibold')}>
              당일 예약 ({getYYYYMMDD(new Date())})
            </span>

            {groupReserves?.todayData && groupReserves.todayData.length > 0 ? (
              <ReserveList reserves={groupReserves.todayData} onClickItem={setSelectedReserve} />
            ) : (
              <ReserveListItem className={cn('bg-neutral-50', 'cursor-default', 'rounded-lg')}>
                오늘 예약된 좌석이 존재하지 않습니다.
              </ReserveListItem>
            )}
          </div>

          <Divide>
            <FaChevronDown /> 예정
          </Divide>

          <Content
            loading={isLoading}
            notData={
              !groupReserves?.afterTodayData ||
              Object.keys(groupReserves?.afterTodayData).length < 1
            }
          >
            <div className="flex flex-col gap-y-3">{renderList(groupReserves?.afterTodayData)}</div>
          </Content>

          <Divide>
            <Button
              className={cn(
                'flex items-center gap-x-2',
                'bg-neutral-50',
                'text-black',
                'border border-neutral-200',
              )}
              onClick={() => setShowReserveHistory((prev) => !prev)}
            >
              <FaChevronDown
                className={cn('transition-transform', { 'rotate-180': showReserveHistory })}
              />
              지난 예약 {showReserveHistory ? '숨기기' : '보기'}
            </Button>
          </Divide>

          {showReserveHistory ? (
            <Content
              loading={isLoading}
              notData={
                !groupReserves?.beforeTodayData ||
                Object.keys(groupReserves?.beforeTodayData).length < 1
              }
            >
              {renderList(groupReserves?.beforeTodayData)}
            </Content>
          ) : null}
        </section>
      </ScrollArea>

      <CancelReserveDrawer
        loading={cancelLoading}
        targetReserve={selectedReserve}
        onClickCancel={(reserve) => cancelReserve(reserve.id)}
        onClose={() => setSelectedReserve(null)}
      />
    </Container>
  );
}

export default Reserve;
