import { useAppSelector } from '@/redux/reduxHook';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Image, MenuProps, Typography } from 'antd';
import ButtonLogout from './ButtonLogout';
import { useNavigate } from 'react-router-dom';

function ButtonActionProfile() {
  const profile = useAppSelector((state) => state?.auth?.account);
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Button
          icon={<UserOutlined />}
          type="link"
          onClick={() => navigate('/profile')}
        >
          Profile
        </Button>
      ),
    },
    {
      key: 'change-password',
      label: (
        <Button
          icon={<LockOutlined />}
          type="link"
          onClick={() => navigate('/change-password')}
        >
          Change Password
        </Button>
      ),
    },
    {
      key: 'logout',
      label: <ButtonLogout />,
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} trigger={['hover']}>
        <Button type="link">
          <Flex align="center" gap={8}>
            <Flex vertical>
              <Typography.Text className="text-sm font-semibold">
                {profile?.name}
              </Typography.Text>
              <span className="text-xs text-gray-400">
                {profile?.role.name}
              </span>
            </Flex>
            {profile?.avatar ? (
              <Image
                width={40}
                height={40}
                src={profile?.avatar}
                alt={profile?.name}
                style={{ borderRadius: '50%' }}
                preview={false}
              />
            ) : (
              <i className="fa-solid fa-user-circle text-[40px] text-gray-400" />
            )}
          </Flex>
        </Button>
      </Dropdown>
    </>
  );
}

export default ButtonActionProfile;
