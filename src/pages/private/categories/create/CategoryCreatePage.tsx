import CategoryForm from '@/features/categories/components/form/CategoryForm';

import { ICategoryPayload } from '@/features/categories/data/interface';
import useCategoryState from '@/features/categories/hooks/useCategoryState';
import CategoryService from '@/features/categories/service';
import { useMutation } from '@tanstack/react-query';

import { useCallback } from 'react';

function CategoryCreatePage() {
  const { onSuccess, onError } = useCategoryState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ICategoryPayload) => {
      const response = await CategoryService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Category created successfully');
    },
    onError,
  });

  const onSubmit = useCallback(
    (values: ICategoryPayload) => {
      mutate(values);
    },
    [mutate]
  );

  return (
    <div className="flex flex-1 flex-col gap-4">
      <CategoryForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default CategoryCreatePage;
