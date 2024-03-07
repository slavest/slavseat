import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export type CalendarDate = Date;
export type CalendarSelectMode = 'days' | 'months' | 'years';
export type CalendarNavDirection = 1 | -1;

interface CalendarContextState {
  selectedDate?: CalendarDate;
  mode?: CalendarSelectMode;
  handleSelectDate?: (date: CalendarDate) => void;
  handleSelectMode?: (mode: CalendarSelectMode) => void;
  handleClickNav?: (direction: CalendarNavDirection) => void;
}

export interface CalendarContextProviderProps {
  children?: ReactNode;
  onChangeDate?: (date: CalendarDate) => void;
}

const getChangedDateByNav = (
  mode: CalendarSelectMode,
  date: CalendarDate,
  direction: CalendarNavDirection,
) => {
  if (mode === 'days') {
    const changedDate = new Date(
      date.getFullYear(),
      date.getMonth() + direction,
      date.getDate(),
    );
    return changedDate;
  }
  return date;
};

const CalendarContext = createContext<CalendarContextState>({
  selectedDate: new Date(), // XXX :: 일단 undefined 상태(빈 화면) 고려 X
  mode: 'days',
});

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw Error('useCalendarContext must be within CalendarProvider');
  }
  return context;
};

export const CalendarContextProvider = ({
  children,
  onChangeDate,
}: CalendarContextProviderProps) => {
  const [mode, setMode] = useState<CalendarSelectMode>('days');
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(
    new Date(),
  );

  const changeDate = useCallback(
    (date: CalendarDate) => {
      setSelectedDate(date);
      // props onChangeDate(date);
      onChangeDate?.(date);
    },
    [onChangeDate],
  );

  const handleSelectDate = useCallback(
    (date: CalendarDate) => {
      changeDate(date);
    },
    [changeDate],
  );

  const handleClickNav = useCallback(
    (direction: CalendarNavDirection) => {
      const changedDate = getChangedDateByNav(
        mode,
        selectedDate,
        direction,
      );
      console.log({ changedDate });

      changeDate(changedDate);
    },
    [mode, selectedDate, changeDate],
  );

  const handleSelectMode = useCallback(
    (mode: CalendarSelectMode) => {
      setMode(mode);
    },
    [setMode],
  );

  const contextValue = {
    selectedDate,
    mode,
    handleSelectDate,
    handleSelectMode,
    handleClickNav,
  };
  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
