import React from 'react';

interface BoldMapIconProps extends React.SVGProps<SVGSVGElement> {}

export function BoldMapIcon(props: BoldMapIconProps) {
  return (
    <svg height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_511_3970)">
        <path
          clipRule="evenodd"
          d="M8.87469 0.865086L5.12531 0.115116V13.1349L8.8747 13.8849L8.87469 0.865086ZM10.1247 13.8592L13.6213 12.9851C13.8438 12.9294 14 12.7294 14 12.5V0.500005C14 0.346038 13.9291 0.200658 13.8077 0.105905C13.6864 0.0111509 13.5281 -0.0224085 13.3787 0.0149311L10.1247 0.828381V13.8592ZM0.378741 1.01493L3.87531 0.140857V13.1716L0.621259 13.9851C0.471889 14.0224 0.313646 13.9889 0.19229 13.8941C0.0709343 13.7994 0 13.654 0 13.5V1.5C0 1.27057 0.156153 1.07057 0.378741 1.01493Z"
          fill="inherit"
          fillRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="clip0_511_3970">
          <rect fill="white" height="14" width="14" />
        </clipPath>
      </defs>
    </svg>
  );
}