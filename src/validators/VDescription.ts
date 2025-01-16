export const VDescription = (value: string) => {
  // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  const trimmedValue = value.trim();

  // Kiểm tra chuỗi không được để trống
  if (trimmedValue.length === 0) {
    return false;
  }

  // Chấp nhận bất kỳ ký tự nào (bao gồm chữ, số, ký tự đặc biệt, emoji)
  return true;
};
