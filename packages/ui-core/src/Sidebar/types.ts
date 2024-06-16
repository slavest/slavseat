import React from 'react';

export interface SidebarContextState {
  location?: string;
  onLocationChange?: (location: string) => void;
}
