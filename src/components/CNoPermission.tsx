import { Empty, Flex } from 'antd';

function CNoPermission() {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className="h-[calc(100vh-64px)]"
    >
      <Empty
        description={
          <span className="lg:text-2xl text-xl ">
            You don't have permission to access this page !!!
          </span>
        }
      />
    </Flex>
  );
}

export default CNoPermission;
