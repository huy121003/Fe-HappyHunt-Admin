import { Button, DatePicker, Dropdown, Flex } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import CButton from '../buttons/CButton';
import { Type1, Type2 } from '@/constants';
import { DownOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
interface IChooseDateProps {
  type: string;
  handleSelectType: (type: string) => void;
  handleSelectDate: (dates: [Date | null, Date | null]) => void;
  start?: string;
  end?: string;
  setText: (text: string) => void;
}
function CChooseDate({
  type,
  handleSelectType,
  handleSelectDate,
  start,
  end,
  setText,
}: IChooseDateProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e: any) => {
    if (e.key === 'CUSTOM') {
      setShowDatePicker(true);

      e.preventDefault();
    } else {
      setText(Type2.find((item) => item.value === e.key)?.label || 'All');

      setShowDatePicker(false);

      handleSelectType(e.key);
      setVisible(true);
    }
  };
  const handlezVisible = (flag) => {
    setVisible(flag);
  };
  const menuItems = [
    ...Type2.map((item) => ({
      key: item.value,
      label: item.label,
    })),
    {
      key: 'CUSTOM',
      label: (
        <Flex gap={10}>
          {'Custom'}

          {showDatePicker && (
            <Flex vertical gap={10}>
              <RangePicker
                onChange={(dates: any) => {
                  setDateRange(dates);
                }}
              />
              <Flex gap={10}>
                <CButton
                  type="default"
                  onClick={() => {
                    setShowDatePicker(false);
                    setVisible(false);
                  }}
                >
                  Cancel
                </CButton>
                <CButton
                  type="primary"
                  onClick={() => {
                    if (dateRange[0] && dateRange[1]) {
                      handleSelectDate([dateRange[0], dateRange[1]]);
                      setText(
                        `${dayjs(dateRange[0]).format(
                          'DD/MM/YYYY'
                        )} - ${dayjs(dateRange[1]).format('DD/MM/YYYY')}`
                      );
                    }
                    setVisible(false);
                  }}
                >
                  Apply
                </CButton>
              </Flex>
            </Flex>
          )}
        </Flex>
      ),
    },
  ];

  return (
    <Flex justify="start" align="center" gap={10} wrap>
      {Type1.map((item) => (
        <Button
          key={item.value}
          value={type}
          type={type === item.value ? 'primary' : 'default'}
          onClick={() => {
            handleSelectType(item.value);
            setText(item.label);
          }}
          className={`px-4 py-2 rounded-lg transition-all duration-300
            `}
        >
          {item.label}
        </Button>
      ))}

      <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        trigger={['click']}
        open={visible}
        onOpenChange={handlezVisible}
      >
        <Button
          type={
            Type2.find((item) => item.value === type)?.value
              ? 'primary'
              : type === 'CUSTOM'
                ? 'primary'
                : 'default'
          }
          className="px-4 py-2 rounded-lg transition-all duration-300"
        >
          {Type2.find((item) => item.value === type)
            ? Type2.find((item) => item.value === type)?.label
            : type === 'CUSTOM'
              ? `${dayjs(start).format(
                  'DD/MM/YYYY'
                )} - ${dayjs(end).format('DD/MM/YYYY')}`
              : 'Custom'}
          <DownOutlined />
        </Button>
      </Dropdown>
    </Flex>
  );
}

export default CChooseDate;
