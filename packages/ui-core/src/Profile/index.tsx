import React from 'react';

import {
  profileImageStyle,
  profileNameStyle,
  profileRootStyle,
  profileSubtextStyle,
} from './profile.css';

interface ProfileProps {
  name: string;
  imageUrl?: string;
  subtext?: string;
}

export function Profile({ name, imageUrl, subtext }: ProfileProps) {
  return (
    <div className={profileRootStyle}>
      <div className={profileImageStyle} />
      <div>
        <div className={profileNameStyle}>{name}</div>
        <div className={profileSubtextStyle}>{subtext}</div>
      </div>
    </div>
  );
}
