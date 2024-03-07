import reactLogo from './assets/react.svg';
import React, { useState } from 'react';

import './App.css';
import { Button } from './components/atoms/Button';
import { Text } from './components/atoms/Text';
import Calendar from './components/molecules/Calendar';
import Popover from './components/molecules/Popover';
import Select from './components/molecules/Select';
import { useInitalizeStyle } from './hooks/useInitalizeStyle';
import { useThemeStore } from './stores/themeStore';
import viteLogo from '/vite.svg';

function App() {
  useInitalizeStyle();

  const { toggleDarkMode } = useThemeStore();
  const [count, setCount] = useState(0);

  const handleChangeDate = (date: Date) => {
    console.log({ date });
  };
  return (
    <>
      <div className="bg-red-200">asd</div>
      <div>
        <Calendar.Root onChangeDate={handleChangeDate}>
          <Calendar.Header />
          <Calendar.Nav />
          <Calendar.Body />
        </Calendar.Root>
      </div>
    </>
  );
}

export default App;
