
// ui-core => headless component
./src/Button/index.tsx -> headless 컴포넌트

// ui-desktop
./src/Button/index.tsx -> ui-core 참조 + style 주입 = Button
./src/Button/index.css.ts -> MobileButtonStyle, DesktopButtonStyle
./src/Themes/index.ts -> { MobileButtonStyle, DesktopButtonStyle }
./src/Components/index.ts -> { Button }
./src/index.ts => { Themes, Components }

// apps/frontend
./src/features/user/logout/Button.tsx -> ui-desktop Button 가져오기, ui-mobile Button 가져오기
Button에 대한 커스텀이 필요한 경우 ui-core에서 컴포넌트 가져오고 ui-desktop에서 스타일 가져와서 사용
