import React from 'react';

interface LogoWithNameIconProps
  extends React.HTMLAttributes<SVGSVGElement> {}

export function LogoWithNameIcon(props: LogoWithNameIconProps) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="512" height="512" fill="white" />
      <path
        d="M116 255.664L255.664 116L395.328 255.664L325.496 325.496L290.58 360.412H255.664H220.748L185.832 325.496L116 255.664Z"
        fill="black"
      />
      <path
        d="M256.236 355.962V194"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="square"
      />
      <path
        d="M232.534 355.559V241"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="square"
      />
      <path
        d="M278 355.559L278 241"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="square"
      />
      <path
        d="M154.666 434V391.818H171.555C174.659 391.818 177.247 392.278 179.32 393.198C181.394 394.118 182.952 395.395 183.996 397.029C185.039 398.649 185.561 400.517 185.561 402.631C185.561 404.279 185.232 405.728 184.572 406.977C183.913 408.213 183.007 409.229 181.854 410.026C180.714 410.808 179.41 411.364 177.94 411.694V412.106C179.547 412.174 181.05 412.628 182.451 413.465C183.865 414.303 185.012 415.477 185.891 416.987C186.769 418.484 187.209 420.269 187.209 422.342C187.209 424.58 186.653 426.578 185.54 428.336C184.442 430.08 182.815 431.46 180.659 432.476C178.503 433.492 175.846 434 172.688 434H154.666ZM163.585 426.709H170.855C173.34 426.709 175.153 426.235 176.293 425.288C177.432 424.326 178.002 423.049 178.002 421.457C178.002 420.29 177.721 419.26 177.158 418.367C176.595 417.475 175.791 416.774 174.748 416.266C173.718 415.758 172.489 415.504 171.061 415.504H163.585V426.709ZM163.585 409.469H170.196C171.418 409.469 172.503 409.257 173.45 408.831C174.411 408.392 175.167 407.774 175.716 406.977C176.279 406.181 176.56 405.227 176.56 404.114C176.56 402.59 176.018 401.361 174.933 400.428C173.862 399.494 172.338 399.027 170.361 399.027H163.585V409.469ZM207.141 434.618C203.942 434.618 201.175 433.938 198.841 432.579C196.52 431.206 194.728 429.297 193.465 426.853C192.202 424.395 191.57 421.546 191.57 418.305C191.57 415.037 192.202 412.181 193.465 409.737C194.728 407.279 196.52 405.371 198.841 404.011C201.175 402.638 203.942 401.952 207.141 401.952C210.34 401.952 213.1 402.638 215.421 404.011C217.755 405.371 219.554 407.279 220.817 409.737C222.081 412.181 222.712 415.037 222.712 418.305C222.712 421.546 222.081 424.395 220.817 426.853C219.554 429.297 217.755 431.206 215.421 432.579C213.1 433.938 210.34 434.618 207.141 434.618ZM207.182 427.821C208.638 427.821 209.853 427.409 210.828 426.585C211.803 425.748 212.537 424.608 213.032 423.166C213.54 421.724 213.794 420.084 213.794 418.244C213.794 416.404 213.54 414.763 213.032 413.321C212.537 411.879 211.803 410.74 210.828 409.902C209.853 409.064 208.638 408.646 207.182 408.646C205.713 408.646 204.477 409.064 203.475 409.902C202.486 410.74 201.738 411.879 201.23 413.321C200.736 414.763 200.488 416.404 200.488 418.244C200.488 420.084 200.736 421.724 201.23 423.166C201.738 424.608 202.486 425.748 203.475 426.585C204.477 427.409 205.713 427.821 207.182 427.821ZM242.711 434.618C239.512 434.618 236.745 433.938 234.411 432.579C232.09 431.206 230.299 429.297 229.035 426.853C227.772 424.395 227.14 421.546 227.14 418.305C227.14 415.037 227.772 412.181 229.035 409.737C230.299 407.279 232.09 405.371 234.411 404.011C236.745 402.638 239.512 401.952 242.711 401.952C245.911 401.952 248.671 402.638 250.991 404.011C253.326 405.371 255.124 407.279 256.388 409.737C257.651 412.181 258.282 415.037 258.282 418.305C258.282 421.546 257.651 424.395 256.388 426.853C255.124 429.297 253.326 431.206 250.991 432.579C248.671 433.938 245.911 434.618 242.711 434.618ZM242.753 427.821C244.208 427.821 245.423 427.409 246.398 426.585C247.373 425.748 248.108 424.608 248.602 423.166C249.11 421.724 249.364 420.084 249.364 418.244C249.364 416.404 249.11 414.763 248.602 413.321C248.108 411.879 247.373 410.74 246.398 409.902C245.423 409.064 244.208 408.646 242.753 408.646C241.283 408.646 240.048 409.064 239.045 409.902C238.057 410.74 237.308 411.879 236.8 413.321C236.306 414.763 236.059 416.404 236.059 418.244C236.059 420.084 236.306 421.724 236.8 423.166C237.308 424.608 238.057 425.748 239.045 426.585C240.048 427.409 241.283 427.821 242.753 427.821ZM271.938 424.896L271.959 414.371H273.236L283.369 402.364H293.441L279.827 418.264H277.746L271.938 424.896ZM263.988 434V391.818H272.762V434H263.988ZM283.76 434L274.451 420.221L280.3 414.021L294.038 434H283.76ZM324.068 411.385L316.035 411.879C315.898 411.193 315.603 410.575 315.15 410.026C314.697 409.463 314.099 409.016 313.358 408.687C312.63 408.344 311.758 408.172 310.742 408.172C309.383 408.172 308.236 408.46 307.302 409.037C306.369 409.6 305.902 410.355 305.902 411.303C305.902 412.058 306.204 412.696 306.808 413.218C307.412 413.74 308.449 414.159 309.918 414.474L315.644 415.628C318.72 416.259 321.013 417.276 322.523 418.676C324.034 420.077 324.789 421.917 324.789 424.196C324.789 426.269 324.178 428.089 322.956 429.654C321.747 431.219 320.086 432.442 317.971 433.32C315.871 434.185 313.447 434.618 310.701 434.618C306.513 434.618 303.176 433.746 300.691 432.002C298.219 430.245 296.771 427.855 296.345 424.835L304.975 424.381C305.236 425.658 305.867 426.633 306.87 427.306C307.872 427.965 309.156 428.295 310.721 428.295C312.259 428.295 313.495 428 314.429 427.409C315.376 426.805 315.857 426.029 315.871 425.082C315.857 424.285 315.52 423.633 314.861 423.125C314.202 422.603 313.186 422.205 311.813 421.93L306.334 420.839C303.245 420.221 300.945 419.15 299.434 417.626C297.938 416.102 297.189 414.159 297.189 411.797C297.189 409.765 297.739 408.014 298.837 406.545C299.949 405.076 301.508 403.943 303.513 403.146C305.531 402.35 307.893 401.952 310.598 401.952C314.594 401.952 317.738 402.796 320.031 404.485C322.338 406.174 323.684 408.474 324.068 411.385ZM335.731 445.864C334.619 445.864 333.575 445.774 332.6 445.596C331.639 445.431 330.843 445.218 330.211 444.957L332.188 438.408C333.218 438.723 334.145 438.895 334.969 438.923C335.806 438.95 336.527 438.758 337.131 438.346C337.749 437.934 338.25 437.234 338.635 436.245L339.15 434.906L327.801 402.364H337.028L343.578 425.597H343.908L350.519 402.364H359.808L347.512 437.419C346.922 439.122 346.118 440.605 345.102 441.868C344.1 443.145 342.83 444.127 341.292 444.813C339.754 445.513 337.9 445.864 335.731 445.864Z"
        fill="black"
      />
    </svg>
  );
}
