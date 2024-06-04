export function createWrapperAndAppendToBody(wrapperId: string, className?: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  if (className) wrapperElement.className = className;
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
