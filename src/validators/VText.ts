// nhâpj văn bản, loại bỏ khoảng trắng ở đầu và cuối chuỗi, không chứa ký tự đặc biệt,ko được để trống
export const VText = (value: string) => {
  return /^[a-zA-Z0-9]{1,}$/.test(value);
};
