
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import MenuCategory from '@/features/categories/components/ui/MenuCategoryDetail';
import { API_KEY } from '@/features/categories/data/constant';
import CategoryService from '@/features/categories/service';
import { useQuery } from '@tanstack/react-query';
import { Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}
const CategoryPage: React.FC<IProps> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORIES],
    queryFn: async () => {
      const response = await CategoryService.getAll();
      return response.data;
    },
  });

  const navigate = useNavigate();
  return (
    <div className=" flex-1 flex flex-col h-full overflow-hidden">
      <CHeaderCard
        title="Category Management"
        actions={
          <Flex gap={8}>
            <CButtonCreateNew onClick={() => navigate('/categories/create')} />
          </Flex>
        }
      />

      <Card className="  flex flex-col flex-1">
        <div className="flex flex-row flex-1 h-full ">
          <MenuCategory categories={data || []} loading={isLoading} />

          <Flex vertical className="flex-1 h-full  ">
            {children}
          </Flex>
        </div>
      </Card>
    </div>
  );
};

export default CategoryPage;
