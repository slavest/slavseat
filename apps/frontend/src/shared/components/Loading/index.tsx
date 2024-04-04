import React from 'react';
import { CgSpinner } from 'react-icons/cg';

export function Loading() {
  return (
    <div className="w-full h-full grid place-content-center">
      <CgSpinner className="animate-spin w-5 h-5" />
    </div>
  );
}
