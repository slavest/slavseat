export interface BaseMutation<T extends (...args: never) => unknown> {
  onSuccess?: (data: Awaited<ReturnType<T>>) => void;
}
