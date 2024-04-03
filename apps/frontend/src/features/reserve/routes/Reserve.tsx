import React, {
  ComponentProps,
  PropsWithChildren,
  useState,
} from 'react';

import { Model } from '@slavseat/types';

import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

import { CancelReserveDrawer } from '../components/CancelReserveDrawer';
import { ErrorNotice } from '../components/ErrorNotice';
import { NotData } from '../components/NotData';
import { ReserveList } from '../components/ReserveList';
import { useReserve } from '../hooks/useReserve';
import { getSeatName } from '../utils/reserve.util';

function Container({
  children,
  className,
  ...attr
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'w-full h-full bg-neutral-100 px-10 py-16',
        className,
      )}
      {...attr}
    >
      {children}
    </div>
  );
}

interface ContentProps {
  loading: boolean;
  notData: boolean;
}

function Content({
  children,
  loading = false,
  notData = false,
}: PropsWithChildren<ContentProps>) {
  if (loading) return '...loading';

  if (notData) return <NotData />;

  return children;
}

function Reserve() {
  const [selectedReserve, setSelectedReserve] =
    useState<Model.ReserveInfo | null>(null);

  const { user } = useUserStore();

  const {
    alwayReserve,
    usingReserves,
    groupReserves,
    isError,
    isLoading,
    cancelReserve,
  } = useReserve({
    onCancelSuccess: () => {
      alert('예약이 취소되었습니다.');
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
    <Container>
      <header className="mb-8">
        <h1 className="w-full flex items-center flex-wrap text-2xl font-bold">
          <p>{user?.name || '...'}</p>
          <p>님의 좌석 예약 현황</p>
        </h1>
        <p className="text-sm text-neutral-700">
          {`현재 [${usingReserves
            .map((reserve) => getSeatName(reserve))
            .join(', ')}] 좌석을 이용 가능합니다.`}
        </p>
      </header>

      <section className="flex flex-col gap-y-8">
        <Content
          loading={isLoading}
          notData={!alwayReserve && !groupReserves}
        >
          <>
            {alwayReserve && (
              <ReserveList
                title="고정 좌석"
                reserves={[alwayReserve]}
                onClickItem={setSelectedReserve}
              />
            )}

            {dateKeys.map((date) =>
              groupReserves?.[date] ? (
                <ReserveList
                  key={date}
                  title={date}
                  reserves={groupReserves[date]}
                  onClickItem={setSelectedReserve}
                />
              ) : null,
            )}
          </>
        </Content>
      </section>

      <CancelReserveDrawer
        // open={!!selectedReserve}
        onClose={() => setSelectedReserve(null)}
        targetReserve={selectedReserve}
        onClickCancel={(reserve) => cancelReserve(reserve.id)}
      />
    </Container>
  );
}

export default Reserve;
