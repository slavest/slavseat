export const getParsedCookies = (): Record<
  string,
  string | undefined
> => {
  const cookieString = document.cookie;
  const cookies: Record<string, string> = {}; // 쿠키 이름과 값을 저장할 객체
  if (cookieString === '') return cookies;

  // 쿠키 문자열을 공백으로 분리하여 배열로 만듭니다
  const cookieArray = cookieString.split(';');

  // 배열을 순회하면서 각 쿠키를 파싱합니다
  for (const cookie of cookieArray) {
    const [name, value] = cookie.split('=');

    // 쿠키 이름과 값을 객체에 추가합니다. trim()을 사용하여 앞뒤 공백을 제거합니다.
    cookies[name.trim()] = value.trim();
  }

  return cookies;
};

export function deleteCookie(key: string) {
  // 만료일을 과거로 설정하여 쿠키를 삭제
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
