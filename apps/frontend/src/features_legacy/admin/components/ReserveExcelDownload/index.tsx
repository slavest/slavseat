import React from 'react';
import { CSVLink } from 'react-csv';
import { Headers } from 'react-csv/lib/core';
import { FaFileCsv } from 'react-icons/fa6';

import { Model } from '@slavseat/types';
import { formatDate } from 'date-fns';

import { ColumnType } from '@/shared/components/Table';
import { cn } from '@/shared/utils/class.util';

interface ReserveExcelDownloadProps {
  columns: ColumnType<Model.ReserveInfo>[];
  data?: Model.ReserveInfo[];
}

export function ReserveExcelDownload({ columns, data }: ReserveExcelDownloadProps) {
  const headers: Headers = columns.map((column) => ({
    label: column.headerContent as string,
    key: column.dataKey,
  }));

  const csvData = data?.map((value) => ({
    ...value,
    always: value.always ? '고정석' : '시간차',
    facility: `${value.facility.floor.name} ${value.facility.name}`,
  }));

  const disabled = !data || data.length <= 0;

  const today = new Date();

  console.log(formatDate(today, 'yyMMdd'));

  return (
    <CSVLink
      className={cn(
        'flex items-center justify-center gap-x-2',
        'px-4 py-2',
        'border border-neutral-300',
        'bg-white',
        'rounded-lg',
        'hover:bg-neutral-50',
        { 'cursor-default opacity-60': disabled },
      )}
      data={csvData || []}
      filename={`Booksy_Reserves_${formatDate(today, 'yyMMdd')}`}
      headers={headers}
      onClick={() => {
        if (disabled) return false;

        return confirm(`${data.length}개의 데이터를 csv 파일로 내보낼까요?`);
      }}
    >
      <FaFileCsv />
      CSV 다운로드
    </CSVLink>
  );
}
