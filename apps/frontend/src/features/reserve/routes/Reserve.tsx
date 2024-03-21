import React, { ComponentProps } from 'react';

import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

import { ErrorNotice } from '../components/ErrorNotice';
import { NotData } from '../components/NotData';
import { ReserveList } from '../components/ReserveList';
import { useGetReserveByUser } from '../query/reserve.query';

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

function Reserve() {
  const { data, isError, isLoading } = useGetReserveByUser();
  const { user } = useUserStore();

  console.log(data);

  const renderContent = () => {
    return !data ? (
      <NotData notDataPrefix="예약 현황이" />
    ) : (
      <>
        {/* TODO: 날짜별 데이터 가공 필요 일단 그냥 리스트업 */}
        <ReserveList reserves={data} />

        <ReserveList reserves={data} />
      </>
    );
  };

  if (isError) {
    return (
      <Container className="grid place-content-center">
        <ErrorNotice code={500} messages="FF" />
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
          Sub Text | 서브 텍스트 모식갱이
        </p>
      </header>

      <section className="flex flex-col gap-y-8">
        {isLoading ? '...loading' : renderContent()}
      </section>
    </Container>
  );
}

export default Reserve;
