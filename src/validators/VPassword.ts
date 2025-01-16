export const VPassword = (value: string): boolean => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/.test(value);
};
