import categoryApi from '@/apis/categoryApi';
import HBuildMenuTree from '@/Helpers/HBuildMenuTree';
import { ICategory } from '@/interfaces';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';

const CMenuCategoryAdmin = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await categoryApi.AFetchCategories();
      if (result.statusCode === 200) {
        setCategories(HBuildMenuTree(result.data));
      }
    };
    fetchCategories();
  }, []);

  const renderMenuItems = (items) =>
    items.map((item) =>
      item.children.length > 0 ? (
        <Menu.SubMenu key={item._id} title={item.nameVn}>
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item._id}>{item.nameVn}</Menu.Item>
      )
    );

  return <Menu mode="inline">{renderMenuItems(categories)}</Menu>;
};

export default CMenuCategoryAdmin;
