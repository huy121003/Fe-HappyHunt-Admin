import { CDeleteModal } from '@/components';
import CButton from '@/components/buttons/CButton';
import CHeaderCard from '@/components/CHeaderCard';
import CategoryForm from '@/features/categories/components/form/CategoryForm';
import { API_KEY } from '@/features/categories/data/constant';
import useCategoryState from '@/features/categories/hooks/useCategoryState';
import CategoryService from '@/features/categories/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Flex } from 'antd';

import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryDetailPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { onSuccess, onError } = useCategoryState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORY_DETAIL, categoryId],
    queryFn: async () => {
      const response = await CategoryService.getbyId(Number(categoryId));
      return response;
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await CategoryService.delete(Number(categoryId));
      return response;
    },
    onSuccess: () => {
      onSuccess('Category deleted successfully');
    },
    onError,
  });
  const onDelete = useCallback(() => {
    deleteMutation.mutate();
  }, [categoryId]);

  return (
    <>
      <CHeaderCard
        title="Category Detail"
        actions={
          <Flex gap={8}>
            <CButton size="large" type="default" onClick={() => setOpen(true)}>
              Delete
            </CButton>
            <CButton
              size="large"
              onClick={() => {
                navigate(`/categories/${categoryId}/update`);
              }}
            >
              Update
            </CButton>
          </Flex>
        }
      />
      <CategoryForm
        loading={isLoading}
        onSubmit={() => {}}
        data={data?.data}
        isView={true}
      />
      <CDeleteModal
        message="Are you sure you want to delete this category?"
        open={open}
        setOpen={setOpen}
        onOk={onDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
export default CategoryDetailPage;
