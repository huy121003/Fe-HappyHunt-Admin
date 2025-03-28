import { Card, Flex } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

interface ITotalGrandProps {
  grandTotalInvoices: number | undefined;
  grandTotalAmount: number | undefined;
  text: string;
}

const TotalGrand: React.FC<ITotalGrandProps> = ({
  grandTotalInvoices,
  grandTotalAmount,
  text = '',
}) => {
  return (
    <Flex gap={10} className="w-full my-4" align="center">
      <Card className="w-full bg-gradient-to-r from-white to-orange-500 shadow-lg rounded-xl p-4 ">
        <h1 className="font-bold text-black ">Total Revenue {text}</h1>
        <h1 className="text-4xl text-center text-black font-bold my-4">
          <CountUp
            start={0}
            end={grandTotalAmount || 0}
            duration={2.75}
            separator=","
            suffix=" VND"
          />
        </h1>
      </Card>
      <Card className="w-full bg-gradient-to-r from-white to-orange-500 shadow-lg rounded-xl p-4">
        <h1 className="font-bold text-black ">Total Invoices {text}</h1>
        <h1 className="text-4xl text-center text-black font-bold my-4">
          <CountUp
            start={0}
            end={grandTotalInvoices || 0}
            duration={2.75}
            separator=","
          />
        </h1>
      </Card>
    </Flex>
  );
};

export default TotalGrand;
