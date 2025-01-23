import React from 'react';
import InputEmoji from 'react-input-emoji';

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLenght?: number;
}

const CTextArea: React.FC<Props> = ({
  placeholder,
  value = '',
  onChange = () => {},
  maxLenght,
}) => {
  // Giữ nguyên giá trị của value, không thay đổi thẻ HTML
  const processedValue = value; // Không thay đổi gì ở đây

  return (
    <InputEmoji
      borderRadius={10}
      maxLength={maxLenght}
      value={processedValue} // Giá trị của tin nhắn
      onChange={onChange} // Hàm xử lý khi thay đổi giá trị
      placeholder={placeholder} // Placeholder
      cleanOnEnter={false} // Không tự động dọn sạch khi nhấn Enter
      shouldReturn={true} // Cho phép xuống dòng khi nhấn Enter
      shouldConvertEmojiToImage={true} // Chuyển emoji thành hình ảnh
      theme="light"
    />
  );
};

export default CTextArea;
