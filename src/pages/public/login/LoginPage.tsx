import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from '@/features/auth/components/form/LoginForm';

import { Card, Divider, Flex, Typography } from 'antd';

function LoginPage() {
  return (
    <AuthLayout>
      <Flex vertical justify="center" align="center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mt-10 mb-4">
          LOGIN
        </h1>
        <Typography.Text className="text-lg text-gray-600 text-center">
          Only administrators can log in! 🚀
        </Typography.Text>
        <Divider />
        <Card>
          <LoginForm />
        </Card>
      </Flex>
    </AuthLayout>
  );
}

export default LoginPage;
