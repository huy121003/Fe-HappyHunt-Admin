import CInput from '@/components/CInput';
import CSelect from '@/components/CSelect';
import { Button, Checkbox, Flex, Form, Select, Typography } from 'antd';
import { Type } from '../../data/constant';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CButton from '@/components/buttons/CButton';

function AttributeForm() {
  return (
    <div>
      <Typography.Title level={5}>Attributes</Typography.Title>
      <Form.List
        name="attributes"
        initialValue={[
          {
            name: '',
            values: [],
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <div className="bg-gray-100 p-4 rounded-md">
            {fields.map(({ key, name, ...restField }) => {
              return (
                <Flex
                  key={key}
                  className="bg-white p-4 rounded-lg shadow mb-2"
                  vertical
                >
                  <Flex className="flex-1" gap={10}>
                    {/* Attribute Name */}
                    <Form.Item
                      className="flex-1"
                      {...restField}
                      name={[name, 'name']}
                      label="Attribute Name"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input attribute name!',
                        },
                      ]}
                    >
                      <CInput placeholder="Input attribute name" />
                    </Form.Item>
                    <Form.Item
                      className=" flex flex-1"
                      label="Is Filter in Search ?"
                      valuePropName="checked"
                      {...restField}
                      name={[name, 'isFilter']}
                    >
                      <Checkbox value={true} />
                    </Form.Item>
                    {/* Attribute Type */}
                  </Flex>
                  <Form.Item
                    {...restField}
                    name={[name, 'type']}
                    label="Attribute Type"
                    rules={[
                      {
                        required: true,
                        message: 'Please select attribute type!',
                      },
                    ]}
                  >
                    <CSelect
                      options={Object.values(Type).map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      placeholder="Please select attribute type"
                      style={{ minWidth: 200 }}
                    />
                  </Form.Item>
                  {/* Watch 'type' for conditional rendering */}
                  <Form.Item shouldUpdate>
                    {({ getFieldValue }) => {
                      const type = getFieldValue(['attributes', name, 'type']);
                      if (type === Type.SELECT || type === Type.RADIO) {
                        return (
                          <Form.Item
                            {...restField}
                            name={[name, 'values']}
                            label="Attribute Values"
                            rules={[
                              {
                                required: true,
                                message: 'Please input attribute values!',
                              },
                            ]}
                          >
                            <Select
                              mode="tags"
                              placeholder="Input attribute values"
                              style={{ minWidth: 200 }}
                            />
                          </Form.Item>
                        );
                      }
                      return null;
                    }}
                  </Form.Item>

                  {/* Remove Button */}
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
                </Flex>
              );
            })}

            {/* Add Attribute Button */}
            <CButton
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add attribute
            </CButton>
          </div>
        )}
      </Form.List>
    </div>
  );
}

export default AttributeForm;
