import { Card, Empty, Flex, Menu, Spin } from 'antd';
import { ICategoryItem } from '../../data/interface';
import { useNavigate, useParams } from 'react-router-dom';
import BuildMenuTree from '@/helpers/BuildMenuTree';

interface IMenuCategoryProps {
  categories: ICategoryItem[];
  loading: boolean;
}

const MenuCategory: React.FC<IMenuCategoryProps> = ({
  categories,
  loading,
}) => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const categoryTree = BuildMenuTree(categories);

  const renderMenuItems = (items: any) => {
    return items.map((item: any) =>
      item.children?.length > 0 ? (
        <Menu.SubMenu
          key={item._id}
          title={item.name}
          onTitleClick={() => navigate(`/categories/${item._id}/detail`)}
        >
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item
          key={item._id}
          onClick={() => navigate(`/categories/${item._id}/detail`)}
        >
          {item.name}
        </Menu.Item>
      )
    );
  };

  if (categories.length === 0) {
    return (
      <Flex
        className="w-64 h-[600px] overflow-y-auto mr-3 "
        justify="center"
        align="center"
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Category Found"
        />
      </Flex>
    );
  }
  return (
    <Spin spinning={loading}>
      <div>
        <Card className="w-64 h-[600px] overflow-y-auto mr-3">
          <Menu
            mode="inline"
            selectedKeys={categoryId ? [categoryId] : []}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {renderMenuItems(categoryTree)}
          </Menu>
        </Card>
      </div>
    </Spin>
  );
};

export default MenuCategory;
