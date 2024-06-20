import React from 'react';

import {
  profileImageStyle,
  profileNameStyle,
  profileRootStyle,
  profileSubtextStyle,
} from './profile-button.css';

interface ProfileButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  imageUrl?: string;
  subText?: string;
}

export const ProfileButton = React.forwardRef<HTMLButtonElement, ProfileButtonProps>(
  ({ name, imageUrl, subText, ...rest }, ref) => (
    <button ref={ref} className={profileRootStyle} {...rest}>
      <div className={profileImageStyle} />
      <div>
        <div className={profileNameStyle}>{name}</div>
        <div className={profileSubtextStyle}>{subText}</div>
      </div>
    </button>
  ),
);
ProfileButton.displayName = 'SidebarProfile.ProfileButton';

// export function ProfileButton({ name, imageUrl, subText, ...rest }: ProfileButtonProps) {
//   return (
//     <button className={profileRootStyle} {...rest}>
//       <div className={profileImageStyle} />
//       <div>
//         <div className={profileNameStyle}>{name}</div>
//         <div className={profileSubtextStyle}>{subText}</div>
//       </div>
//     </button>
//   );
// }
