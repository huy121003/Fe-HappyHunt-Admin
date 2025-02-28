import { Button, ButtonProps } from 'antd';

const CButtonCreateNew = (props: ButtonProps) => {
  return (
    <Button type="primary" size="large" {...props}>
      Create New
    </Button>
  );
};

export default CButtonCreateNew;
