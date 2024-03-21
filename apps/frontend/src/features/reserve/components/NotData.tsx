import React from 'react';
import { BiSolidErrorCircle } from 'react-icons/bi';

interface NotDataProps {
  notDataPrefix?: string;
}

export function NotData({
  notDataPrefix = '데이터가',
}: NotDataProps) {
  return (
    <section className="w-full flex flex-col items-center">
      <BiSolidErrorCircle className="opacity-60 mb-4" size="50%" />
      <p className="text-xl font-bold text-neutral-700">
        {notDataPrefix} 존재하지 않습니다.
      </p>
    </section>
  );
}
