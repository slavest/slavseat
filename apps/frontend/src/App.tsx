import React, { useCallback, useState } from 'react';

import clsx from 'clsx';

import './App.css';
import { Button } from './components/atoms/Button';
import { Text } from './components/atoms/Text';
import SeatGridEditor, {
  SeatInfo,
} from './components/molecules/SeatGridEditor';
import SeatGridViewer from './components/molecules/SeatGridViewer';
import { dummySeatMap } from './dummy';
import { hideScrollBar } from './global-style.css';
import { useInitalizeStyle } from './hooks/useInitalizeStyle';

function App() {
  useInitalizeStyle();

  const [seats, setSeats] = useState<SeatInfo[]>(dummySeatMap);

  const handleClickAddSeat = useCallback(() => {
    setSeats((prev) => [
      ...prev,
      {
        id: prev.length,
        name: `seat-${prev.length}`,
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      },
    ]);
  }, []);

  return (
    <div className="w-full h-full">
      <div className={clsx('overflow-auto', hideScrollBar)}>
        <SeatGridEditor seats={seats} onChange={setSeats} />
      </div>
      <div className={clsx('overflow-auto', hideScrollBar)}>
        <SeatGridViewer
          seats={seats}
          reserves={[1]}
          objects={[
            { name: 'object-1', x: 1, y: 10, h: 4, w: 4, id: 0 },
          ]}
        />
      </div>

      <Button onClick={handleClickAddSeat}>좌석 추가</Button>
      <Text fontSize="12">
        <pre>{JSON.stringify(seats, null, 2)}</pre>
      </Text>
    </div>
  );
}

export default App;
