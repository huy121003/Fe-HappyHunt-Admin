import CHeaderCard from '@/components/CHeaderCard';
import CSelect from '@/components/CSelect';
import FilterLayout from '@/components/layouts/FilterLayout';
import { EStatus } from '@/features/payments/data/constant';

import ReportTable from '@/features/reports/components/ui/ReportTable';
import { API_KEY, ETargetType } from '@/features/reports/data/constant';
import useReportFilter from '@/features/reports/hooks/useReportFilter';

import ReportService from '@/features/reports/service';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useState } from 'react';

function ReportPage() {
  const [openModal, setOpenModal] = useState(false);

  const {
    handleChangePagination,

    pagination,
    computtedFilter,
    handelSelectTargetType,
    handelSelectStatus,
  } = useReportFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.REPORTS, computtedFilter],
    queryFn: async () => {
      const response = await ReportService.getAll(computtedFilter);
      return response.data;
    },
  });

  return (
    <div className="bg-gray-100 ">
      <CHeaderCard title="Report Listing" actions={null} />
      <Card>
        <FilterLayout>
          <CSelect
            options={Object.entries(EStatus).map(([key, value]) => ({
              label: value,
              value: key,
            }))}
            placeholder="Select Status"
            onChange={handelSelectStatus}
            className="w-64"
            allowClear
          />
          <CSelect
            options={Object.entries(ETargetType).map(([_, value]) => ({
              label: value,
              value: value,
            }))}
            placeholder="Select Target Type"
            onChange={handelSelectTargetType}
            className="w-64"
            allowClear
          />
        </FilterLayout>
        <ReportTable
          data={data?.documentList || []}
          isLoading={isLoading}
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

export default ReportPage;
