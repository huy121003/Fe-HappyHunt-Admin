export const VPhone = (value: string): boolean => {
  // Loại bỏ khoảng trắng đầu và cuối (nếu người dùng nhập nhầm)
  const trimmedValue = value.trim();

  // Biểu thức kiểm tra số điện thoại Việt Nam
  return /^0\d{9}$/.test(trimmedValue);
};
