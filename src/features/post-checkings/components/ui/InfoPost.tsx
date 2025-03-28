import { IPost } from '@/features/posts/data/interface';
import { Typography, Tooltip, Badge } from 'antd';
import React from 'react';
import {
  CalendarOutlined,
  UserOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

interface IProps {
  data: IPost;
}

const InfoPost: React.FC<IProps> = ({ data }) => {
  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <Typography.Title
        level={4}
        className="mb-6 text-black flex items-center gap-2"
      >
        <span className="text-orange-500">Post Information</span>
        <Badge
          status={
            data.status === 'ACTIVE'
              ? 'success'
              : data.status === 'PENDING'
                ? 'warning'
                : 'error'
          }
        />
      </Typography.Title>
      {data && (
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
            <Typography.Text
              strong
              className="text-black flex items-center gap-2"
            >
              <DollarCircleOutlined className="text-orange-500" />
              Basic Information
            </Typography.Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
              <div className="flex flex-col group cursor-pointer transform hover:scale-105 transition-transform duration-200">
                <span className="text-sm text-gray-600">Title</span>
                <Tooltip title={data.name}>
                  <span className="text-base font-medium truncate hover:text-orange-500">
                    {data.name}
                  </span>
                </Tooltip>
              </div>
              <div className="flex flex-col group cursor-pointer transform hover:scale-105 transition-transform duration-200">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-base font-medium text-orange-500 group-hover:text-orange-600">
                  {data.price?.toLocaleString()} VND
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-base font-medium">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      data.status === 'ACTIVE'
                        ? 'bg-orange-100 text-orange-800'
                        : data.status === 'PENDING'
                          ? 'bg-gray-100 text-gray-800'
                          : data.status === 'REJECTED'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {data.status}
                  </span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-base">
                  <Badge
                    color={data.isIndividual ? 'orange' : 'black'}
                    text={data.isIndividual ? 'Individual' : 'Professional'}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Category Information */}
          <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
            <Typography.Text
              strong
              className="text-black flex items-center gap-2"
            >
              <i className="fas fa-tags text-orange-500" />
              Category Information
            </Typography.Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
              <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                <span className="text-sm text-gray-600">Main Category</span>
                <span className="text-base font-medium text-black">
                  {data.categoryParent?.name}
                </span>
              </div>
              <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                <span className="text-sm text-gray-600">Sub Category</span>
                <span className="text-base font-medium text-black">
                  {data.category?.name}
                </span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
            <Typography.Text
              strong
              className="text-black flex items-center gap-2"
            >
              <EnvironmentOutlined className="text-orange-500" />
              Location Information
            </Typography.Text>
            <div className="space-y-4 pl-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-sm text-gray-600">Province</span>
                  <span className="text-base font-medium text-black">
                    {data.address?.province?.name}
                  </span>
                </div>
                <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-sm text-gray-600">District</span>
                  <span className="text-base font-medium text-black">
                    {data.address?.district?.name}
                  </span>
                </div>
                <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-sm text-gray-600">Ward</span>
                  <span className="text-base font-medium text-black">
                    {data.address?.ward?.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                <span className="text-sm text-gray-600">Specific Address</span>
                <span className="text-base font-medium text-black">
                  {data.address?.specificAddress}
                </span>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
            <Typography.Text
              strong
              className="text-black flex items-center gap-2"
            >
              <UserOutlined className="text-orange-500" />
              User Information
            </Typography.Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
              <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                <span className="text-sm text-gray-600">Created By</span>
                <span className="text-base font-medium text-black flex items-center gap-2">
                  <UserOutlined className="text-orange-400" />
                  {data.createdBy?.name}
                </span>
              </div>
              <div className="flex flex-col hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                <span className="text-sm text-gray-600">Created Date</span>
                <span className="text-base font-medium text-black flex items-center gap-2">
                  <CalendarOutlined className="text-orange-400" />
                  {new Date(data.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPost;
