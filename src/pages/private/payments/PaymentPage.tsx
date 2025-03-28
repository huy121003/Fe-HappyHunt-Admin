import { CSearch } from '@/components';
import CHeaderCard from '@/components/CHeaderCard';
import CSelect from '@/components/CSelect';
import FilterLayout from '@/components/layouts/FilterLayout';
import ExportExcel from '@/features/payments/component/ExportExcel';
import PaymentTable from '@/features/payments/component/PaymentTable';
import { Amount, API_KEY, EStatus } from '@/features/payments/data/constant';
import { IPaymentItem } from '@/features/payments/data/interface';
import usePayementFilter from '@/features/payments/hooks/usePaymentFilter';
import usePaymentState from '@/features/payments/hooks/usePaymentState';
import PaymentService from '@/features/payments/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, DatePicker } from 'antd';
import { useCallback, useState } from 'react';

function PaymentPage() {
  const [openModal, setOpenModal] = useState(false);
  const { onSuccess } = usePaymentState();
  const {
    handleChangePagination,
    handleSelectAmount,
    handleSelectStatus,
    handleInput,
    pagination,
    computedFilter,
    handleInputDate,
  } = usePayementFilter();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.PAYMENT, computedFilter],
    queryFn: async () => {
      const response = await PaymentService.getAllPagination(computedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await PaymentService.remove(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('Invoice deleted successfully', () => {
        setOpenModal(false);
      });
    },
  });
  const onDelete = useCallback(
    (record: IPaymentItem) => {
      mutate(Number(record._id));
    },
    [mutate]
  );
  return (
    <div className="bg-gray-100 ">
      <CHeaderCard
        title="Payment Listing"
        actions={
          <ExportExcel
            data={data?.documentList || []}
            fileName="payment"
            sheetName="payment"
          />
        }
      />

      <Card>
        <FilterLayout>
          <CSearch
            placeholder="Search Order Code"
            onInput={handleInput}
            type="number"
          />
          <CSelect
            placeholder="Select Status"
            onChange={handleSelectStatus}
            allowClear
            showSearch
            options={Object.keys(EStatus).map((key) => ({
              label: key,
              value: EStatus[key],
            }))}
          />
          <CSelect
            placeholder="Select Amount"
            onChange={handleSelectAmount}
            allowClear
            showSearch
            options={Amount.map((key) => ({ label: key, value: key }))}
          />
          <DatePicker.RangePicker
            format="YYYY-MM-DD"
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                handleInputDate([dates[0].toDate(), dates[1].toDate()] as [
                  Date,
                  Date,
                ]);
              }
            }}
          />
        </FilterLayout>
        <PaymentTable
          data={data?.documentList || []}
          isLoading={isLoading}
          onDelete={onDelete}
          isDeleteLoading={isPending}
          pagination={{
            ...pagination,
            total: data?.totalDocuments || 0,
          }}
          notFound={isFetched && !data?.totalDocuments}
          onChange={handleChangePagination}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Card>
    </div>
  );
}

export default PaymentPage;
