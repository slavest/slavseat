import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { TimeSlider } from '@/shared/components/TimePicker';

function Favorite() {
  return (
    <div className="w-full h-full">
      <TimeSlider slideCount={60} />
    </div>
  );
}

export default Favorite;
