export function getHHMM(
  date: Date,
  formatFn: (hh: string, mm: string) => string = (hh, mm) =>
    `${hh}:${mm}`,
) {
  const hh = `${date.getHours()}`.padStart(2, '0');
  const mm = `${date.getMinutes()}`.padStart(2, '0');

  return formatFn(hh, mm);
}
