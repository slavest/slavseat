export const getHHMM = (date: Date) => {
  console.log(date);
  return `${date.getHours().toString()}:${date.getMinutes()}`;
};
