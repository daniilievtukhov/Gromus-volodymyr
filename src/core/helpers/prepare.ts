export const getFire = (v: number) => {
  if (v === 1) return 3;
  if (v === 3) return 2;
  if (v === 6) return 1;

  return null;
};
