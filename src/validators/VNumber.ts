// nhập là dạng số phải lớn hơn 0 và không chứa ký tự đặc biệt và khoảng trắng, không có chữ cái
export const VNumber = (value: string) => {
  return /^[1-9][0-9]*$/.test(value);
};
