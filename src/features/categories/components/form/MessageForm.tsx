import CButton from '@/components/buttons/CButton';
import CInput from '@/components/CInput';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Typography } from 'antd';

function MessageForm() {

  return (
    <div>
      <Typography.Title level={5}>Messages</Typography.Title>
      <Form.List
        name="messages"
        initialValue={[
          {
            messageSeller: '',
            messageBuyer: '',
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <div className="bg-gray-100 p-4 rounded-md">
            {fields.map(({ key, name, ...restField }) => {
              return (
                <div key={key} className="bg-white p-4 rounded-lg shadow mb-2">
                  <Flex className="flex-1 w-full" gap={8}>
                    <Form.Item
                      className="flex-1"
                      {...restField}
                      name={[name, 'messageSeller']}
                      label="Message Seller"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input message seller!',
                        },
                      ]}
                    >
                      <CInput placeholder="Input message seller" />
                    </Form.Item>
                    <Form.Item
                      className="flex-1"
                      {...restField}
                      name={[name, 'messageBuyer']}
                      label="Message Buyer"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input message buyer!',
                        },
                      ]}
                    >
                      <CInput placeholder="Input message buyer" />
                    </Form.Item>
                  </Flex>
                  {fields.length > 1 && (
                    <Flex className="items-start">
                      <Button
                        type="text"
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                        className="text-red-500"
                      />
                    </Flex>
                  )}
                </div>
              );
            })}
            <CButton
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Message
            </CButton>
          </div>
        )}
      </Form.List>
    </div>
  );
}
export default MessageForm;
