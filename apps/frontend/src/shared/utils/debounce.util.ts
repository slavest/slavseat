export function debounceAsync<
  T,
  Callback extends (...args: any[]) => Promise<T>,
>(
  callback: Callback,
  wait: number,
): (...args: Parameters<Callback>) => Promise<T> {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise<T>((resolve) => {
      const timeoutPromise = new Promise<void>((resolve) => {
        timeoutId = setTimeout(resolve, wait);
      });
      timeoutPromise.then(async () => {
        resolve(await callback(...args));
      });
    });
  };
}
