import { IPermissionItem } from '@/features/permissions/data/interface';
import { Form, FormInstance, Switch, Table } from 'antd';
import React from 'react';

interface IPermissionFormProps {
  permissions: IPermissionItem[];
  form: FormInstance;
}

const PermissionForm: React.FC<IPermissionFormProps> = ({
  permissions,
  form,
}) => {
  const handlePermissionChange = (
    index: number,
    field: string,
    checked: boolean
  ) => {
    const currentValues = form.getFieldValue('permissions') || [];
    const updatedPermissions = [...currentValues];
    updatedPermissions[index][field] = checked;
    if (checked) {
      updatedPermissions[index].isView = true;
    }

    form.setFieldsValue({ permissions: updatedPermissions });
  };

  interface IColumn {
    title: string;
    dataIndex: string;
    key: string;
    render?: (
      text: any,
      record: IPermissionItem,
      index: number
    ) => React.ReactNode;
  }

  const columns: IColumn[] = [
    {
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'View',
      dataIndex: 'isView',
      key: 'isView',
      render: (_, _record, index: number) => {
        const { isCreate, isUpdate, isDelete } =
          form.getFieldValue(['permissions', index]) || {};
        const isDisabled = isCreate || isUpdate || isDelete;
        return (
          <Form.Item
            name={['permissions', index, 'isView']}
            valuePropName="checked"
            noStyle
          >
            <Switch
              disabled={isDisabled}
              onChange={(checked) =>
                handlePermissionChange(index, 'isView', checked)
              }
            />
          </Form.Item>
        );
      },
    },
    {
      title: 'Create',
      dataIndex: 'isCreate',
      key: 'isCreate',
      render: (_, _record, index) => (
        <Form.Item
          name={['permissions', index, 'isCreate']}
          valuePropName="checked"
          noStyle
        >
          <Switch
            onChange={(checked) =>
              handlePermissionChange(index, 'isCreate', checked)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: 'Update',
      dataIndex: 'isUpdate',
      key: 'isUpdate',
      render: (_, _record, index) => (
        <Form.Item
          name={['permissions', index, 'isUpdate']}
          valuePropName="checked"
          noStyle
        >
          <Switch
            onChange={(checked) =>
              handlePermissionChange(index, 'isUpdate', checked)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'isDelete',
      key: 'isDelete',
      render: (_, _record, index) => (
        <Form.Item
          name={['permissions', index, 'isDelete']}
          valuePropName="checked"
          noStyle
        >
          <Switch
            onChange={(checked) =>
              handlePermissionChange(index, 'isDelete', checked)
            }
          />
        </Form.Item>
      ),
    },
  ];

  return (
    <Form.Item name="permissions">
      <Table
        columns={columns}
        dataSource={permissions}
        rowKey="name"
        pagination={false}
      />
    </Form.Item>
  );
};

export default PermissionForm;
