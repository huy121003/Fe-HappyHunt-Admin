import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import {
  Card,
  Checkbox,
  Flex,
  Form,
  Image,
  Radio,
  Spin,
  Typography,
} from 'antd';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';
import { IPost, IUpdateStatusChecking } from '@/features/posts/data/interface';
import { reasonReject } from '@/features/posts/data/reasonReject';
import { EPostStatus } from '@/features/posts/data/constant';

import CButton from '@/components/buttons/CButton';
import InfoPost from '../ui/InfoPost';

interface PostCheckingFormProps {
  loading: boolean;
  onSubmit: (values: IUpdateStatusChecking) => void;
  disabled?: boolean;
  title?: string;
  isView?: boolean;
  data?: IPost;
}

const PostCheckingForm: React.FC<PostCheckingFormProps> = ({
  loading,
  onSubmit,
  disabled,
  title,
  isView,
  data,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onCancel = useCallback(() => {
    navigate('/post-checkings');
  }, [navigate]);

  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: IUpdateStatusChecking = {
      status:
        values.images.filter((image) => image.status === EPostStatus.REJECTED)
          .length > 0
          ? EPostStatus.REJECTED
          : EPostStatus.SELLING,
      expriedAt: data?.expiredAt,
      images: values.images.map((image) => ({
        url: image.url,
        index: image.index,
        reasonReject: image.reasonReject,
      })),
    };

    onSubmit(payload);
  };

  useEffect(() => {
    if (data?.images) {
      const formattedImages = data.images.map((image) => ({
        url: image.url,
        index: image.index,
        status:
          image.reasonReject && image?.reasonReject?.length > 0
            ? EPostStatus.REJECTED
            : EPostStatus.SELLING,
        reasonReject: image.reasonReject || [],
      }));
      form.setFieldsValue({ images: formattedImages });
    }
  }, [data, form]);

  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        title={title || 'Post Checking'}
        disable={disabled}
        onSave={isView ? undefined : form.submit}
      />

      <Card className="mt-2 shadow-lg rounded-lg overflow-hidden">
        <Flex gap={20} vertical>
          {/* Post Information Section */}
          {data && <InfoPost data={data} />}
          {/* Image Checking Section */}
          <div className="flex-1">
            <Form<IUpdateStatusChecking>
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="w-full"
              disabled={disabled || isView}
            >
              <Flex wrap gap={20} flex={1}>
                <Form.List name="images">
                  {(fields) =>
                    fields.map((field) => {
                      const image = data?.images[field.name];
                      return (
                        <Card
                          key={field.key}
                          className="mb-4 border border-gray-200 hover:border-orange-400 transition-all"
                        >
                          <Flex>
                            <Flex vertical>
                              <Typography.Title
                                level={5}
                                className="text-gray-700"
                              >
                                Image #{field.name + 1}
                              </Typography.Title>
                              <Flex gap={16} vertical className="items-start">
                                <Flex justify="space-between w-full">
                                  <div className="relative">
                                    <Image
                                      src={image?.url}
                                      width={200}
                                      height={200}
                                      className="rounded-lg object-cover"
                                    />
                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'url']}
                                      hidden
                                    >
                                      <CInput />
                                    </Form.Item>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'index']}
                                      hidden
                                    >
                                      <CInput />
                                    </Form.Item>
                                  </div>
                                </Flex>

                                <Form.Item
                                  {...field}
                                  name={[field.name, 'status']}
                                  className="mb-2"
                                >
                                  <Radio.Group>
                                    <Radio
                                      value={EPostStatus.SELLING}
                                      onClick={() => {
                                        form.setFields([
                                          {
                                            name: [
                                              'images',
                                              field.name,
                                              'reasonReject',
                                            ],
                                            value: [],
                                          },
                                        ]);
                                      }}
                                    >
                                      Approved
                                    </Radio>
                                    <Radio value={EPostStatus.REJECTED}>
                                      Reject
                                    </Radio>
                                  </Radio.Group>
                                </Form.Item>
                              </Flex>
                            </Flex>
                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, currentValues) => {
                                return (
                                  prevValues?.images?.[field.name]?.status !==
                                  currentValues?.images?.[field.name]?.status
                                );
                              }}
                            >
                              {({ getFieldValue }) => {
                                const status = getFieldValue([
                                  'images',
                                  field.name,
                                  'status',
                                ]);
                                return status === EPostStatus.REJECTED ? (
                                  <div className="space-y-4">
                                    <Flex gap={1} justify="start">
                                      <CButton
                                        shape="circle"
                                        type="text"
                                        className="text-green-500"
                                        onClick={() => {
                                          form.setFields([
                                            {
                                              name: [
                                                'images',
                                                field.name,
                                                'reasonReject',
                                              ],
                                              value: reasonReject,
                                            },
                                          ]);
                                        }}
                                      >
                                        Select all
                                      </CButton>
                                      <CButton
                                        type="text"
                                        shape="circle"
                                        className="text-red-500"
                                        onClick={() => {
                                          form.setFields([
                                            {
                                              name: [
                                                'images',
                                                field.name,
                                                'reasonReject',
                                              ],
                                              value: [],
                                            },
                                          ]);
                                        }}
                                      >
                                        Clear all
                                      </CButton>
                                    </Flex>

                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'reasonReject']}
                                      className="flex-1"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            'Please select at least one reason',
                                        },
                                      ]}
                                    >
                                      <Checkbox.Group className="w-full">
                                        <div className="flex flex-col">
                                          {reasonReject.map((reason) => (
                                            <Checkbox
                                              key={reason}
                                              value={reason}
                                              className="hover:bg-orange-50 p-2 rounded-md transition-all"
                                            >
                                              <span className="text-gray-700">
                                                {reason}
                                              </span>
                                            </Checkbox>
                                          ))}
                                        </div>
                                      </Checkbox.Group>
                                    </Form.Item>
                                  </div>
                                ) : null;
                              }}
                            </Form.Item>
                          </Flex>
                        </Card>
                      );
                    })
                  }
                </Form.List>
              </Flex>
            </Form>
          </div>
        </Flex>
      </Card>
    </Spin>
  );
};

export default PostCheckingForm;
