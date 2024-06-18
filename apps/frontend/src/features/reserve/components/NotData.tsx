import React from 'react';
import { BiSolidErrorCircle } from 'react-icons/bi';

interface NotDataProps {
  notDataPrefix?: string;
}

export function NotData({ notDataPrefix = '데이터가' }: NotDataProps) {
  return (
    <section className="mx-auto flex w-full max-w-[30rem] flex-col items-center">
      <BiSolidErrorCircle className="mb-4 fill-neutral-400" size="25%" />
      <p className="text-xl font-bold text-neutral-600">{notDataPrefix} 존재하지 않습니다.</p>
    </section>
  );
}
