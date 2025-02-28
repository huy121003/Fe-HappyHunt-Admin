import CategoryForm from '@/features/categories/components/form/CategoryForm';
import { API_KEY } from '@/features/categories/data/constant';
import { ICategoryPayload } from '@/features/categories/data/interface';
import useCategoryState from '@/features/categories/hooks/useCategoryState';
import CategoryService from '@/features/categories/service';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

function CategoryUpdatePage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { onSuccess, onError } = useCategoryState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORY_DETAIL, categoryId],
    queryFn: async () => {
      const response = await CategoryService.getbyId(Number(categoryId));
      return response;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ICategoryPayload) => {
      const response = await CategoryService.update(Number(categoryId), data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Category updated successfully');
    },
    onError,
  });
  const onSubmit = (category: ICategoryPayload) => {
    mutate(category);
  };

  return (
    <CategoryForm
      onSubmit={onSubmit}
      data={data?.data}
      loading={isPending}
      title="Category Update"
      disabled={isLoading || isPending}
    />
  );
}

export default CategoryUpdatePage;
