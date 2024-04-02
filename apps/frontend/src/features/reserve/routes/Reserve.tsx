import React, {
  ComponentProps,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';

import { Model } from '@slavseat/types';
import { Drawer } from 'vaul';

import { removeReserve } from '@/shared/api/reserve';
import { Button } from '@/shared/components/Button';
import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

import { ErrorNotice } from '../components/ErrorNotice';
import { NotData } from '../components/NotData';
import { ReserveList } from '../components/ReserveList';
import { useReserve } from '../hooks/useReserve';
import { useGetReserveByUser } from '../query/reserve.query';
import {
  getHHMM,
  getSeatName,
  getYYYYMMDD,
} from '../utils/reserve.util';

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
  const { data, isError, isLoading } = useGetReserveByUser();
  const { user } = useUserStore();

  const { alwayReserve, usingReserves, groupReserves } =
    useReserve(data);

  const dateKeys = groupReserves ? Object.keys(groupReserves) : [];

  const [selectedReserve, setSelectedReserve] =
    useState<Model.ReserveInfo | null>(null);

  const cancelReserve = useCallback((reserve: Model.ReserveInfo) => {
    removeReserve(reserve.id).then(() => {
      alert('예약이 취소되었습니다.');

      // TODO: 캐시 초기화
      // NOTE: mutation 쓰시면 한번 호출로 캐시 초기화까지 가능합니당, remove-facility.ts 참고
    });
  }, []);

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

      <Drawer.Root
        open={!!selectedReserve}
        onClose={() => setSelectedReserve(null)}
      >
        <Drawer.Portal>
          <Drawer.Content className="max-w-[50rem] mx-auto fixed inset-x-0 bottom-0 z-50 flex h-auto flex-col rounded-t-2xl bg-white shadow-blur outline-none p-8">
            <div className={cn('w-full h-full', 'flex flex-col')}>
              {selectedReserve ? (
                <div className="flex flex-col gap-y-3">
                  <div className="flex items-center gap-x-2">
                    <p className="text-xl font-semibold">
                      {getYYYYMMDD(selectedReserve.start)}
                    </p>
                    <p>
                      {selectedReserve.always
                        ? `고정 좌석`
                        : `${getHHMM(
                            selectedReserve.start,
                            (hh, mm) => `${hh}시 ${mm}분`,
                          )} ~ ${getHHMM(
                            selectedReserve.end,
                            (hh, mm) => `${hh}시 ${mm}분`,
                          )}`}
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => cancelReserve(selectedReserve)}
                  >
                    예약 취소 하기
                  </Button>
                </div>
              ) : null}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    </Container>
  );
}

export default Reserve;
