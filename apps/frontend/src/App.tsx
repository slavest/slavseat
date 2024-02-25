import React, { useCallback, useState } from 'react';

import { Model } from '@slavseat/types';
import clsx from 'clsx';

import './App.css';
import { Button } from './components/atoms/Button';
import { Text } from './components/atoms/Text';
import FacilityGridEditor from './components/molecules/FacilityGridEditor';
import FacilityGridViewer from './components/molecules/FacilityGridViewer';
import { dummySeatMap } from './dummy';
import { hideScrollBar } from './global-style.css';
import { useInitalizeStyle } from './hooks/useInitalizeStyle';

function App() {
  useInitalizeStyle();

  const [facilities, setFacilities] =
    useState<Model.FacilitySummary[]>(dummySeatMap);
  const [mode, setMode] = useState<'edit' | 'select'>('edit');
  const [selectedFacilities, setSelectedFacilities] = useState<
    Model.FacilitySummary[]
  >([]);

  const handleClickAddSeat = useCallback(() => {
    setFacilities((prev) => [
      ...prev,
      {
        id: prev.length,
        name: `seat-${prev.length}`,
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        type: Model.FacilityType.SEAT,
      },
    ]);
  }, []);

  return (
    <div className="w-full h-full">
      <Button
        onClick={() =>
          setMode((prev) => (prev === 'edit' ? 'select' : 'edit'))
        }
      >
        모드: {mode}
      </Button>
      <div className={clsx('overflow-auto', hideScrollBar)}>
        <FacilityGridEditor
          mode={mode}
          facilities={facilities}
          selected={selectedFacilities}
          onSelectChange={setSelectedFacilities}
          onChange={setFacilities}
        />
      </div>
      <div className={clsx('overflow-auto', hideScrollBar)}>
        <FacilityGridViewer facilities={facilities} reserves={[1]} />
      </div>

      <Button onClick={handleClickAddSeat}>좌석 추가</Button>
      <Text fontSize="12">
        <pre>{JSON.stringify(facilities, null, 2)}</pre>
      </Text>
    </div>
  );
}

export default App;
