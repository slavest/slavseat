import reactLogo from './assets/react.svg';
import React, { useState } from 'react';

import './App.css';
import { Button } from './components/atoms/Button';
import { Text } from './components/atoms/Text';
import Select from './components/molecules/Select';
import { useInitalizeStyle } from './hooks/useInitalizeStyle';
import { useThemeStore } from './stores/themeStore';
import viteLogo from '/vite.svg';

function App() {
  useInitalizeStyle();

  const { toggleDarkMode } = useThemeStore();
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-red-200">asd</div>
    </>
  );
}

export default App;
