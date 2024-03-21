import React from 'react';
import { BiError } from 'react-icons/bi';

interface ErrorNoticeProps {
  code?: number;
  messages?: string;
  notice?: string;
}

export function ErrorNotice({
  code,
  messages,
  notice = '다시 시도해주세요.',
}: ErrorNoticeProps) {
  return (
    <section className="w-full flex flex-col items-center">
      <BiError className="opacity-65" size="85%" />
      <h1 className="text-2xl font-extrabold mb-1">
        에러!
        {/* TODO: 에러 코드 클립보드 복사 */}
        <span className="font-semibold">
          {code || messages ? ` [${code} ${messages}]` : ''}
        </span>
      </h1>
      <p>{notice}</p>
    </section>
  );
}
