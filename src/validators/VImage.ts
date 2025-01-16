//hình ảnh <1mb và định dạng ảnh png,jpg,jpeg ,kích thước ảnh ảnh không quá 500x500

export const VImage = (file: File) => {
  return (
    file.size < 1024 * 1024 &&
    ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)
  );
};
