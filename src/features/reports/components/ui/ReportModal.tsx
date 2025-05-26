import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { API_KEY, EStatus, ETargetType } from '../../data/constant';
import ReportService from '../../service';
import {
  Avatar,
  Image,
  Modal,
  Typography,
  Tag,
  Divider,
  Card,
  Space,
  Button,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  MessageOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import useReportState from '../../hooks/useReportState';

const frontendUrl = import.meta.env.VITE_PUBLIC_FRONTEND_URL;
const { Title, Text } = Typography;

interface IReportModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reportId: number;
}

function ReportModal({ open, setOpen, reportId }: IReportModalProps) {
  const { onSuccess } = useReportState();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.REPORT_DETAIL, reportId],
    queryFn: async () => {
      const response = await ReportService.getById(reportId);
      return response.data;
    },
    enabled: open && !!reportId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (status: EStatus) => {
      const response = await ReportService.updateStatus(reportId, status);
      return response.data;
    },
    onSuccess: () =>
      onSuccess('Report updated successfully', () => {
        setOpen(false);
      }),
  });

  const handleCheck = (status: EStatus) => {
    mutate(status);
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      PENDING: { color: 'orange', icon: <ExclamationCircleOutlined /> },
      RESOLVED: { color: 'green', icon: <CheckCircleOutlined /> },
      REJECTED: { color: 'red', icon: <CloseCircleOutlined /> },
      SPAM: { color: 'purple', icon: <ExclamationCircleOutlined /> },
      APPROVED: { color: 'blue', icon: <CheckCircleOutlined /> },
    };
    return (
      configs[status as keyof typeof configs] || {
        color: 'default',
        icon: null,
      }
    );
  };

  const getTargetTypeConfig = (type: string) => {
    const configs = {
      [ETargetType.ACCOUNT]: { color: 'blue', icon: <UserOutlined /> },
      [ETargetType.POST]: { color: 'green', icon: <FileTextOutlined /> },
      [ETargetType.REVIEW]: { color: 'purple', icon: <MessageOutlined /> },
    };
    return (
      configs[type as keyof typeof configs] || { color: 'default', icon: null }
    );
  };

  const UserCard = ({ user, title, timestamp }: any) => (
    <Card size="small" style={{ backgroundColor: '#fafafa' }}>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Text strong style={{ color: '#1890ff' }}>
          {title}
        </Text>
        <Space>
          <Avatar src={user?.avatar} size={40} icon={<UserOutlined />} />
          <Space direction="vertical" size={0}>
            <Text strong>{user?.name || 'N/A'}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {user?.email}
            </Text>
            {timestamp && (
              <Text type="secondary" style={{ fontSize: 11 }}>
                {new Date(timestamp).toLocaleString()}
              </Text>
            )}
          </Space>
        </Space>
        <Divider style={{ margin: '8px 0' }} />
        <Typography.Link
          href={`${frontendUrl}profile/${user?.slug}`}
          target="_blank"
          style={{ fontSize: 14 }}
        >
          View Profile
        </Typography.Link>
      </Space>
    </Card>
  );

  const renderTargetContent = () => {
    const targetConfig = getTargetTypeConfig(data?.targetType ?? '');

    return (
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space>
            <Text strong style={{ fontSize: 16 }}>
              Reported Content
            </Text>
            <Tag
              color={targetConfig.color}
              icon={targetConfig.icon}
              style={{ fontWeight: 500 }}
            >
              {data?.targetType}
            </Tag>
          </Space>

          {data?.targetType === ETargetType.ACCOUNT && (
            <UserCard
              user={data?.account}
              title="Reported Account"
              timestamp={null}
            />
          )}

          {data?.targetType === ETargetType.POST && (
            <Card size="small" style={{ backgroundColor: '#f6ffed' }}>
              <Space
                direction="vertical"
                size="small"
                style={{ width: '100%' }}
              >
                <Text strong style={{ color: '#52c41a' }}>
                  Reported Post
                </Text>
                <Title level={5} style={{ margin: 0, color: '#262626' }}>
                  {data?.post?.name || 'Untitled Post'}
                </Title>

                {data?.post?.images && data.post.images.length > 0 && (
                  <Space wrap>
                    {data.post.images
                      .slice(0, 3)
                      .map((image: any, index: number) => (
                        <Image
                          key={index}
                          src={image.url}
                          width={80}
                          height={80}
                          style={{
                            objectFit: 'cover',
                            borderRadius: 8,
                            border: '2px solid #d9f7be',
                          }}
                          alt={`post-image-${index}`}
                          preview
                        />
                      ))}
                    {data.post.images.length > 3 && (
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 8,
                          border: '2px solid #d9f7be',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f6ffed',
                        }}
                      >
                        <Text strong>+{data.post.images.length - 3}</Text>
                      </div>
                    )}
                  </Space>
                )}
                <Typography.Link
                  href={`${frontendUrl}detail-post/${data.post.slug}`}
                  target="_blank"
                  style={{ fontSize: 14 }}
                >
                  View Full Post
                </Typography.Link>
                <UserCard
                  user={data?.post?.createdBy}
                  title="Post Author"
                  timestamp={data?.post?.createdAt}
                />
              </Space>
            </Card>
          )}

          {data?.targetType === ETargetType.REVIEW && (
            <Card size="small" style={{ backgroundColor: '#f9f0ff' }}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <Text strong style={{ color: '#722ed1' }}>
                  Reported Review
                </Text>

                <div
                  style={{
                    padding: 12,
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    border: '1px solid #d3adf7',
                  }}
                >
                  <Text>
                    {Array.isArray(data?.review?.content) &&
                    data.review.content.length > 0
                      ? data.review.content.join(' ')
                      : 'No review content available'}
                  </Text>
                </div>
                <Typography.Link
                  href={`${frontendUrl}profile/${data.review.target.slug}/reviews`}
                  target="_blank"
                  style={{ fontSize: 14 }}
                >
                  View Full Review
                </Typography.Link>
                <Row gutter={16}>
                  <Col span={12}>
                    <UserCard
                      user={data?.review?.createdBy}
                      title="Review Author"
                      timestamp={data?.review?.createdAt}
                    />
                  </Col>
                  <Col span={12}>
                    <Card size="small" style={{ backgroundColor: '#fff7e6' }}>
                      <Space direction="vertical" size="small">
                        <Text strong style={{ color: '#fa8c16' }}>
                          Related Post
                        </Text>
                        <Space>
                          <Avatar
                            src={data?.post?.images?.[0]?.url}
                            size={32}
                            icon={<PictureOutlined />}
                          />
                          <Space direction="vertical" size={0}>
                            <Text style={{ fontSize: 13 }}>
                              {data?.post?.name || 'N/A'}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 11 }}>
                              {data?.post?.createdAt &&
                                new Date(data.post.createdAt).toLocaleString()}
                            </Text>
                          </Space>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </Space>
            </Card>
          )}
        </Space>
      </Card>
    );
  };

  const statusConfig = getStatusConfig(data?.status ?? '');

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={
        <Space>
          <Text strong style={{ fontSize: 18 }}>
            Report Details
          </Text>
          <Text type="secondary">#{reportId}</Text>
        </Space>
      }
      width={800}
      centered
      footer={null}
      destroyOnClose
      loading={isLoading}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header Status & Time */}
        <Card size="small">
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <Tag
                  color={statusConfig.color}
                  icon={statusConfig.icon}
                  style={{ fontWeight: 500, fontSize: 14, padding: '4px 12px' }}
                >
                  {data?.status}
                </Tag>
                <Text type="secondary">
                  Created:{' '}
                  {data?.createdAt && new Date(data.createdAt).toLocaleString()}
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Reporter Information */}
        <UserCard
          user={data?.createdBy}
          title="Report Submitted By"
          timestamp={data?.createdAt}
        />

        {/* Target Content */}
        {renderTargetContent()}
        {/* Reason for Report */}
        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space>
              <Text strong style={{ fontSize: 16 }}>
                Report Reason
              </Text>
              <Tag color="orange" icon={<ExclamationCircleOutlined />}>
                {data?.title || 'No reason provided'}
              </Tag>
            </Space>
            <Text type="secondary" style={{ fontSize: 14 }}>
              {data?.reason || 'No additional description provided.'}
            </Text>
          </Space>
        </Card>
        {/* Proof Images */}
        {(data?.images?.length ?? 0) > 0 && (
          <Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Space>
                <PictureOutlined style={{ color: '#1890ff' }} />
                <Text strong style={{ fontSize: 16 }}>
                  Evidence Attachments
                </Text>
              </Space>
              <Space wrap size="middle">
                {data?.images?.map((image: string, index: number) => (
                  <Image
                    key={index}
                    src={image}
                    width={100}
                    height={100}
                    style={{
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '2px solid #1890ff',
                    }}
                    alt={`evidence-${index}`}
                    preview
                  />
                ))}
              </Space>
            </Space>
          </Card>
        )}

        {/* Actions or Resolution Info */}
        <Card>
          {data?.status === EStatus.PENDING ? (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Text strong style={{ fontSize: 16 }}>
                Review Actions
              </Text>
              <Row justify="end" gutter={[8, 8]}>
                <Col>
                  <Button
                    icon={<ExclamationCircleOutlined />}
                    onClick={() => handleCheck(EStatus.SPAM)}
                    loading={isPending}
                  >
                    Mark as Spam
                  </Button>
                </Col>
                <Col>
                  <Button
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleCheck(EStatus.REJECTED)}
                    loading={isPending}
                  >
                    Reject Report
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleCheck(EStatus.APPROVED)}
                    loading={isPending}
                  >
                    Approve Report
                  </Button>
                </Col>
              </Row>
            </Space>
          ) : (
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text strong style={{ fontSize: 16, color: '#52c41a' }}>
                Resolution Details
              </Text>
              <UserCard
                user={data?.updatedBy}
                title="Resolved By"
                timestamp={data?.updatedAt}
              />
            </Space>
          )}
        </Card>
      </Space>
    </Modal>
  );
}

export default ReportModal;
