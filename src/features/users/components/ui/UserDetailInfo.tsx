import React from 'react';
import { Card, Avatar, Badge, Tag, Tooltip } from 'antd';
import { IUser } from '../../data/interface';


const user: IUser = {
  name: 'John Doe',
  username: 'johndoe',
  avatar: 'https://picsum.photos/200',
  phoneNumber: '123-456-7890',
  isVip: true,
  isBanned: false,
  description: 'A passionate software developer.',
  address: {
    provinceId: { _id: 1, name: 'California' },
    districtId: { _id: 2, name: 'Los Angeles' },
    wardId: { _id: 3, name: 'Hollywood' },
    specificAddress: '123 Sunset Blvd',
  },
};

const UserDetail: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card className="shadow-lg rounded-lg w-full max-w-4xl p-6 bg-white">
        <div className="flex flex-col items-center text-center">
          {/* Avatar + VIP Badge */}
          <div className="relative">
            <Avatar
              src={user.avatar}
              size={150}
              className={`border-4 ${
                user.isVip ? 'border-yellow-500' : 'border-gray-300'
              }`}
            />
            {user.isVip && (
              <Badge
                count="VIP"
                className="absolute -top-2 -right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded-full"
              />
            )}
          </div>

          <h2 className="text-3xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-500 text-lg">@{user.username}</p>

          {/* Status */}
          <div className="mt-2">
            {user.isBanned ? (
              <Tag color="red">Banned</Tag>
            ) : (
              <Tag color="green">Active</Tag>
            )}
          </div>

          {/* User Information */}
          <div className="w-full text-left mt-6 space-y-4 text-lg">
            <p>
              <strong>Phone:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {user.address.specificAddress},{' '}
              {user.address.wardId.name}, {user.address.districtId.name},{' '}
              {user.address.provinceId.name}
            </p>
            <p>
              <strong>Description:</strong>{' '}
              <Tooltip title={user.description}>
                <span className="truncate w-96 block">{user.description}</span>
              </Tooltip>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserDetail;
