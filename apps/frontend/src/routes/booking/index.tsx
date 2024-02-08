'use client';

import React, { useState } from 'react';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa6';

import { AnimatePresence, motion } from 'framer-motion';

interface Item {
  number: number;
  isBooking: boolean;
  isLike: boolean;
}

const mockDatas: Item[] = [
  {
    number: 1,
    isBooking: false,
    isLike: true,
  },
  {
    number: 2,
    isBooking: true,
    isLike: true,
  },
  {
    number: 3,
    isBooking: true,
    isLike: false,
  },
  {
    number: 4,
    isBooking: false,
    isLike: false,
  },
  {
    number: 5,
    isBooking: false,
    isLike: false,
  },
  {
    number: 6,
    isBooking: false,
    isLike: true,
  },
  {
    number: 7,
    isBooking: false,
    isLike: false,
  },
  {
    number: 8,
    isBooking: false,
    isLike: true,
  },
  {
    number: 9,
    isBooking: true,
    isLike: true,
  },
  {
    number: 10,
    isBooking: false,
    isLike: false,
  },
  {
    number: 11,
    isBooking: false,
    isLike: true,
  },
  {
    number: 12,
    isBooking: false,
    isLike: false,
  },
  {
    number: 13,
    isBooking: false,
    isLike: true,
  },
];

export function Booking() {
  const [selectedItem, setSelectedItem] = useState<
    Item | undefined
  >();

  return (
    <div className="w-full h-full relative">
      <div
        className={`w-full bg-neutral-100 ${
          selectedItem ? 'h-[calc(100%_-_18rem)]' : 'h-full'
        }`}
      >
        <ul
          className={`h-full flex flex-col gap-3 p-4 overflow-y-auto`}
        >
          {mockDatas.map(({ number, isBooking, isLike }) => (
            <li
              key={number}
              className={`relative min-h-14 flex items-center px-4 rounded-lg bg-white ${
                number === selectedItem?.number
                  ? 'bg-neutral-200 shadow-inner'
                  : 'shadow-sm'
              }`}
              onClick={() =>
                // TODO: 해당 클릭 시 하단 dialog는 새로 api 콜 (티켓팅 처럼 실시간 성이 중요하다면)?
                setSelectedItem({ number, isBooking, isLike })
              }
            >
              <p>{number} 번</p>
              <div
                className={`w-2 h-2 ml-4 rounded-full ${
                  isBooking ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              />

              <div
                className={`absolute top-0 right-0 w-1 h-full rounded-tr-lg rounded-br-lg ${
                  isLike ? 'bg-red-400' : 'bg-neutral-800'
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.article
            className="absolute bottom-0 right-0 w-full h-[18rem] flex flex-col bg-white justify-between p-4 border-t border-neutral-300"
            key="booking-info"
            transition={{ type: 'spring', duration: 0.45 }}
            initial={{ y: '18rem' }}
            animate={{ y: 0 }}
            exit={{ y: '18rem' }}
          >
            <div>
              <h3 className="w-full text-2xl font-bold flex items-center justify-between">
                {selectedItem.number}번 좌석
                <div className="text-[1.25rem] text-red-400">
                  {selectedItem.isLike ? <FaHeart /> : <FaRegHeart />}
                </div>
              </h3>

              <span
                className={
                  selectedItem.isBooking
                    ? 'text-red-600'
                    : 'text-green-600'
                }
              >
                {selectedItem.isBooking ? ' 사용 중' : ' 예약 가능'}
              </span>
            </div>

            <div className="w-full flex justify-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center bg-neutral-600 text-white font-semibold px-5 py-3 w-14 h-14 rounded-full"
                onClick={() => setSelectedItem(undefined)}
              >
                <FaArrowLeft size="1.25rem" />
              </button>
              <button
                type="button"
                className={`flex items-center justify-center bg-green-500 text-white font-semibold px-6 py-3 flex-1 rounded-full disabled:opacity-50 disabled:bg-red-600`}
                disabled={selectedItem.isBooking}
              >
                {selectedItem.isBooking ? '예약불가' : '예약하기'}
              </button>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
