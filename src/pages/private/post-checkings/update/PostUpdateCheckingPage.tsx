import PostCheckingForm from '@/features/post-checkings/components/form/PostCheckingForm';
import { API_KEY } from '@/features/posts/data/constant';
import { IUpdateStatusChecking } from '@/features/posts/data/interface';
import usePostState from '@/features/posts/hooks/usePostStatus';
import PostService from '@/features/posts/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

function PostUpdateCheckingPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { onSuccess, onError } = usePostState();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_DETAIL, postId],
    queryFn: async () => {
      const response = await PostService.getById(Number(postId));
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IUpdateStatusChecking) => {
      const response = await PostService.updateStatusChecking(
        Number(postId),
        data
      );
      return response.data;
    },
    onSuccess: () => {
      onSuccess('Update post status checking successfully', () => {
        navigate('/post-checkings');
      });
    },
    onError,
  });
  const handleUpdatePostStatus = (data: IUpdateStatusChecking) => {
    mutate(data);
  };
  return (
    <div className="flex flex-1 flex-col gap-4">
      <PostCheckingForm
        loading={isPending || isLoading || !isFetched}
        onSubmit={handleUpdatePostStatus}
        data={data}
        title="Post Checking Update"
      />
    </div>
  );
}

export default PostUpdateCheckingPage;
