import React from 'react';
import {
  FaBoltLightning,
  FaHeart,
  FaQuestion,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import { Box } from '../../components/atoms/Box';

export function Main() {
  return (
    <Box
      width="screen-width"
      height="screen-height"
      backgroundColor="background.primary"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
        <ul className="w-full flex flex-col justify-center items-center gap-y-4">
          <div className="relative w-44 h-44 grid place-content-center bg-white rounded-full text-yellow-300 shadow-md z-10">
            <FaBoltLightning size="4rem" />
          </div>

          <div className="relative w-44 h-44 grid place-content-center bg-white rounded-full text-red-400 shadow-md">
            <FaHeart size="4rem" />
          </div>
        </ul>

        <Link
          to="/booking"
          className="bg-white text-black text-xl px-5 py-3 rounded-2xl shadow-md"
        >
          좌석 보러 가기
        </Link>

        <div className="absolute bottom-2 right-2 w-14 h-14 rounded-full bg-white text-black grid place-content-center shadow-md">
          <FaQuestion size="1rem" />
        </div>
      </div>
    </Box>
  );
}
