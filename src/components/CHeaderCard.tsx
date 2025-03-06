import { Card, Flex, Typography } from 'antd';
import { ReactNode } from 'react';

type TProps = {
  title: string;
  actions: ReactNode;
};

const CHeaderCard = ({ title, actions }: TProps) => {
  return (
    <Card className="!mb-1">
      <Flex justify="space-between" align="center" className="w-full ">
        <Typography.Title level={4} className="!mb-0">
          {title}
        </Typography.Title>
        {actions}
      </Flex>
    </Card>
  );
};

export default CHeaderCard;
