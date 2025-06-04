export default function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  timeout: number = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), timeout);
  };
}
