import React from 'react';

interface LinearTicketIconProps extends React.SVGProps<SVGSVGElement> {}

export function LinearTicketIcon(props: LinearTicketIconProps) {
  return (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.90625 10.6797C0.90625 11.232 1.35397 11.6797 1.90625 11.6797H12.0938C12.646 11.6797 13.0938 11.232 13.0938 10.6797V8.84C12.2835 8.62035 11.6875 7.87977 11.6875 7C11.6875 6.12023 12.2835 5.37965 13.0938 5.16V3.32031C13.0938 2.76803 12.646 2.32031 12.0938 2.32031H1.90625C1.35397 2.32031 0.90625 2.76803 0.90625 3.32031V5.15583C1.72446 5.37015 2.32812 6.11458 2.32812 7C2.32812 7.88542 1.72446 8.62985 0.90625 8.84417V10.6797Z"
        stroke="#A3A3A3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.10938 2.32812V3.96876"
        stroke="#A3A3A3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.10938 6.17969V7.82031"
        stroke="#A3A3A3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.10938 10.0391V11.6797"
        stroke="#A3A3A3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
