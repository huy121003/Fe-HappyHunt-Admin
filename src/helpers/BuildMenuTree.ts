import { ICategoryItem } from '@/features/categories/data/interface';

const BuildMenuTree = (categories: ICategoryItem[]): ICategoryItem[] => {
  const map = new Map<number, ICategoryItem & { children: ICategoryItem[] }>();

  // Khởi tạo danh mục với children rỗng
  categories.forEach((cat) =>
    map.set(Number(cat._id), { ...cat, children: [] })
  );

  return categories.reduce<ICategoryItem[]>((tree, cat) => {
    const node = map.get(cat._id)!;

    if (cat.parent) {
      map.get(Number(cat.parent._id))?.children.push(node);
    } else {
      tree.push(node);
    }
    return tree;
  }, []);
};
export default BuildMenuTree;
