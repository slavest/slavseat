// TODO: 나중에 수정 | 다른 브랜치에 공통으로 쓸만하게 있었던 기억이 있음!
export function getHHMM(date: Date | string) {
  if (typeof date === 'string') {
    return date.split('T')[1].slice(0, 5);
  }

  return `${date.getHours()}:${date.getMinutes()}`;
}
