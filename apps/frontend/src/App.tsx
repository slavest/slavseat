import reactLogo from './assets/react.svg';
import React, { useCallback, useState } from 'react';

import { Model } from '@slavseat/types';
import { style } from '@vanilla-extract/css';
import { motion } from 'framer-motion';

import {
  floorImageStyle,
  iconPopoverContentStyle,
  iconVariant,
  rootStyle,
} from './App.css';
import { Box } from './components/atoms/Box';
import { Button } from './components/atoms/Button';
import Input from './components/atoms/Input';
import { Text } from './components/atoms/Text';
import Drawer from './components/molecules/Drawer';
import Popover from './components/molecules/Popover';
import Select from './components/molecules/Select';
import { useInitalizeStyle } from './hooks/useInitalizeStyle';
import { useThemeStore } from './stores/themeStore';
import viteLogo from '/vite.svg';

type SeatCreateType = Pick<
  Model.SeatInfo,
  'id' | 'label' | 'x' | 'y'
>;

function App() {
  useInitalizeStyle();

  const { toggleDarkMode } = useThemeStore();
  const [editingSeat, setEditingSeat] = useState<number>();
  const [focusedRef, setFocusedRef] =
    useState<HTMLSpanElement | null>(null);
  const [items, setItems] = useState<SeatCreateType[]>([]);

  const closeDrawer = useCallback(() => {
    setEditingSeat(undefined);
  }, []);

  const findSeatById = useCallback(
    (id: number) => {
      const seat = items.find((item) => item.id === id);
      console.log(items, id, seat);
      if (seat === undefined) throw new Error('좌석이 없습니다.');
      return seat;
    },
    [items],
  );

  const handleImageClick = useCallback<
    React.MouseEventHandler<HTMLImageElement>
  >(
    (e) => {
      if (editingSeat !== undefined) {
        closeDrawer();
      } else {
        const newItem = {
          id: items.length,
          label: `새 좌석 ${items.length}`,
          x: Math.abs(e.currentTarget.x - e.clientX),
          y: Math.abs(e.currentTarget.y - e.clientY),
        };

        setItems((prev) => [...prev, newItem]);
        setEditingSeat(newItem.id);
      }
    },
    [closeDrawer, editingSeat, items.length],
  );

  const handleUpdateEdit = useCallback(
    (id: number, data: Partial<SeatCreateType>) => {
      setItems((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
            };
          }
          return item;
        });
      });
    },
    [],
  );

  const handleRemoveItem = useCallback(
    (removeId: number) => {
      setItems((prev) => prev.filter((item) => item.id !== removeId));
      closeDrawer();
    },
    [closeDrawer],
  );

  // TODO: 편집중인 좌석 정보 팝오버로 계속 보여주기
  return (
    <div className={rootStyle}>
      <Button onClick={toggleDarkMode}>DarkMode</Button>
      <Drawer open={editingSeat !== undefined} position="right">
        {editingSeat !== undefined &&
          findSeatById(editingSeat) !== undefined && (
            <Box display="flex" flexDirection="column" gap="2">
              <Input
                label="이름"
                value={findSeatById(editingSeat).label}
                onChange={(label) =>
                  handleUpdateEdit(findSeatById(editingSeat).id, {
                    label,
                  })
                }
              />
              <Input
                label="X 위치"
                value={findSeatById(editingSeat).x}
                type="number"
                onChange={(x) =>
                  handleUpdateEdit(findSeatById(editingSeat).id, {
                    x: Number(x),
                  })
                }
              />
              <Input
                label="Y 위치"
                value={findSeatById(editingSeat).y}
                type="number"
                onChange={(y) =>
                  handleUpdateEdit(findSeatById(editingSeat).id, {
                    y: Number(y),
                  })
                }
              />
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={() =>
                    editingSeat !== undefined &&
                    handleRemoveItem(editingSeat)
                  }
                >
                  삭제
                </Button>
                <Button onClick={closeDrawer}>닫기</Button>
              </Box>
            </Box>
          )}
      </Drawer>
      <Box
        position="relative"
        width="full"
        height="full"
        overflow="scroll"
      >
        <Popover.Root
          anchorEl={focusedRef}
          open={focusedRef !== null}
        >
          <Popover.Content className={iconPopoverContentStyle}>
            {editingSeat !== undefined &&
              findSeatById(editingSeat) &&
              findSeatById(editingSeat).label}
          </Popover.Content>
        </Popover.Root>
        {items.map((item) => (
          <span
            ref={(ref) => {
              if (editingSeat === item.id) {
                // ref?.focus();
                // ref?.scrollIntoView({
                //   block: 'center',
                //   inline: 'center',
                // });
                setFocusedRef(ref);
              }
            }}
            key={item.id}
            style={{
              left: item.x,
              top: item.y,
            }}
            className={iconVariant({
              focused: editingSeat === item.id,
            })}
            onFocus={() => setEditingSeat(item.id)}
            tabIndex={0}
            // layoutId={String(item.id)}
          />
        ))}
        <img
          src="/3f.png"
          alt=""
          onClick={handleImageClick}
          className={floorImageStyle}
        />
      </Box>
    </div>
  );
}

export default App;
