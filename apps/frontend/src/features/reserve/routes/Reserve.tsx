import React, { ComponentProps, PropsWithChildren, useState } from 'react';
import { toast } from 'react-toastify';

import { Model } from '@slavseat/types';

import { Loading } from '@/shared/components/Loading';
import ScrollArea from '@/shared/components/ScrollArea';
import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

import { CancelReserveDrawer } from '../components/CancelReserveDrawer';
import { ErrorNotice } from '../components/ErrorNotice';
import { NotData } from '../components/NotData';
import { ReserveList } from '../components/ReserveList';
import { useReserve } from '../hooks/useReserve';
import { getSeatName } from '../utils/reserve.util';

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

function Reserve() {
  const [selectedReserve, setSelectedReserve] = useState<Model.ReserveInfo | null>(null);

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
  });

  const dateKeys = groupReserves ? Object.keys(groupReserves) : [];

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
        <section className="flex flex-col gap-y-8">
          <Content loading={isLoading} notData={!alwayReserve && dateKeys.length < 1}>
            {alwayReserve && (
              <ReserveList
                reserves={[alwayReserve]}
                title="고정 좌석"
                onClickItem={setSelectedReserve}
              />
            )}

            {dateKeys.map((date) =>
              groupReserves?.[date] ? (
                <ReserveList
                  key={date}
                  reserves={groupReserves[date]}
                  title={date}
                  onClickItem={setSelectedReserve}
                />
              ) : null,
            )}
          </Content>
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
