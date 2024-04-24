import React from 'react';
import { CgSpinner } from 'react-icons/cg';

export function Loading() {
  return (
    <div className="grid h-full w-full place-content-center">
      <CgSpinner className="h-5 w-5 animate-spin" />
    </div>
  );
}
