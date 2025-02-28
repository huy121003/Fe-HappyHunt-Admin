import { Empty, Typography } from 'antd';

function NoCategory() {
  return (
    <div
      className="flex-1
     justify-center items-center flex flex-col"
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Typography.Text>
            Please select a category to view details
          </Typography.Text>
        }
      />
    </div>
  );
}

export default NoCategory;
