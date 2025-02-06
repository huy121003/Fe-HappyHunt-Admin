import { useAppSelector } from '@/redux/reduxHook';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'Normal User' | 'Super Admin'; // Chỉ cho phép role cụ thể
}

const LRoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userRole = useAppSelector((state) => state.auth.account.role.name); // Giả sử bạn lưu role người dùng trong Redux

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Nếu chưa đăng nhập, điều hướng đến trang home
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/" />; // Nếu role không khớp, điều hướng về trang chủ hoặc trang khác
  }

  return <>{children}</>; // Nếu đã đăng nhập và role đúng, hiển thị các trang con
};

export default LRoleProtectedRoute;
