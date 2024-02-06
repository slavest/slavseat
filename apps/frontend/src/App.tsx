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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Button onClick={toggleDarkMode}>DarkMode</Button>

      <div className="card">
        <Select.Root>
          <Select.Trigger>
            <Button>Button</Button>
          </Select.Trigger>
          <Select.Popover>
            <Select.Item id="1" value="1">
              item1
            </Select.Item>
            <Select.Item id="2" value="2">
              item2
            </Select.Item>
            <Select.Item id="3" value="3">
              item3
            </Select.Item>
          </Select.Popover>
        </Select.Root>
        <Text>Text Component</Text>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
