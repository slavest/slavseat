import React from 'react';

interface LogoWithoutNameIconProps extends React.HTMLAttributes<SVGSVGElement> {}

export function LogoWithoutNameIcon(props: LogoWithoutNameIconProps) {
  return (
    <svg
      fill="none"
      height="280"
      viewBox="0 0 280 280"
      width="280"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 139.664L139.664 -3.78651e-06L279.328 139.664L209.496 209.496L174.58 244.412H139.664H104.748L69.832 209.496L0 139.664Z"
        fill="black"
      />
      <path d="M140.236 239.962V78" stroke="white" strokeLinecap="square" strokeWidth="10" />
      <path d="M116.534 239.559V125" stroke="white" strokeLinecap="square" strokeWidth="10" />
      <path d="M162 239.559L162 125" stroke="white" strokeLinecap="square" strokeWidth="10" />
    </svg>
  );
}
