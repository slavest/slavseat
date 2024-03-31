import React, { ComponentProps } from 'react';

import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

import { ErrorNotice } from '../components/ErrorNotice';
import { NotData } from '../components/NotData';
import { ReserveList } from '../components/ReserveList';
import { useGetReserveByUser } from '../query/reserve.query';
import {
  checkNowUse,
  getHHMM,
  groupDataByDate,
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

function Reserve() {
  const { data, isError, isLoading } = useGetReserveByUser();
  const { user } = useUserStore();

  const renderDescription = () => {
    const useReserve = checkNowUse(data);

    return useReserve
      ? `현재 ${useReserve.facility.floor.name}-${useReserve.facility.name} 좌석을 사용중 입니다.`
      : '현재 사용중인 좌석이 없습니다.';
  };

  const renderContent = () => {
    if (!data || data.length <= 0)
      return <NotData notDataPrefix="예약 현황이" />;

    const groupData = groupDataByDate(data);

    return Object.keys(groupData)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => (
        <div key={date}>
          <span className="text-xs text-gray-500 font-semibold px-1">
            {date}
          </span>
          <ReserveList reserves={groupData[date]} />
        </div>
      ));
  };

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
          {renderDescription()}
        </p>
      </header>

      <section className="flex flex-col gap-y-8">
        {isLoading ? '...loading' : renderContent()}
      </section>
    </Container>
  );
}

export default Reserve;
