import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useCreateFloorMutation } from '@/shared/api/query/floor/create-floor';
import { useGetAllFloorSummaryQuery } from '@/shared/api/query/floor/get-all-floor-summary';
import { Button } from '@/shared/components/Button';

import { Box } from '../components/Box';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminFloorManage() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('층 관리'), [setTitle]);

  const [floorName, setFloorName] = useState<string>('');

  const { mutate: createFloorMutation } = useCreateFloorMutation({
    onSuccess: () => {
      setFloorName('');
      toast.success('추가를 완료했습니다.');
    },
    onError: (e) => toast.error(e.response?.data.message),
  });

  const { data: allFloorSummary } = useGetAllFloorSummaryQuery();

  return (
    <div className="p-4">
      <Box title="Floor 리스트">
        <pre>{JSON.stringify(allFloorSummary, null, 2)}</pre>
      </Box>

      <Box title="Floor 추가 폼">
        <input
          className="px-2 py-1 border border-zinc-500 rounded-md text-sm"
          type="text"
          placeholder="Floor 이름"
          onChange={(e) => setFloorName(e.target.value)}
        />
        <Button
          variant="tertiary"
          onClick={() => createFloorMutation({ name: floorName })}
        >
          Floor 추가
        </Button>
      </Box>

      <Box title="Floor 수정">
        <span className="text-neutral-400">추가 예정</span>
      </Box>
    </div>
  );
}
