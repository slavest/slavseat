import React, { Fragment, useCallback, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import './App.css';
import { Button } from './components/atoms/Button';
import { Text } from './components/atoms/Text';
import SeatGrid from './components/molecules/SeatGrid';
import { dummySeatMap } from './dummy';
// const ResponsiveGridLayout = WidthProvider(Responsive);
import { useInitalizeStyle } from './hooks/useInitalizeStyle';

function App() {
  useInitalizeStyle();

  const [layout, setLayout] = useState(dummySeatMap);

  const handleClickAddSeat = useCallback(() => {
    setLayout((prev) => [
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
      <div className="overflow-x-scroll overflow-y-scroll bg-zinc-800">
        {/* style={{ transform: 'scale(0.5) translate(-50%, -50%)' }} */}
        <SeatGrid seats={dummySeatMap}>
          <div></div>
        </SeatGrid>
      </div>

      <Button onClick={handleClickAddSeat}>좌석 추가</Button>
      <Text fontSize="12">
        <pre>{JSON.stringify(layout, null, 2)}</pre>
      </Text>
    </div>
  );
}

export default App;
