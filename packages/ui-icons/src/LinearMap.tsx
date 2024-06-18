import React from 'react';

interface LinearMapIconProps extends React.SVGProps<SVGSVGElement> {}

export function LinearMapIcon(props: LinearMapIconProps) {
  return (
    <svg height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_520_2152)">
        <path
          d="M4.83 12.5L1.72502 13.2171C1.09836 13.3618 0.5 12.8859 0.5 12.2427V2.29538C0.5 1.82978 0.821324 1.42579 1.27498 1.32102L4.83 0.5V12.5Z"
          stroke="#A3A3A3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.82996 12.5L9.16996 13.5V1.5L4.82996 0.5V12.5Z"
          stroke="#A3A3A3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 11.7046C13.5 12.1702 13.1787 12.5742 12.7251 12.679L9.17004 13.5V1.5L12.275 0.782916C12.9017 0.638191 13.5 1.11411 13.5 1.75727V11.7046Z"
          stroke="#A3A3A3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_520_2152">
          <rect fill="white" height="14" width="14" />
        </clipPath>
      </defs>
    </svg>
  );
}
