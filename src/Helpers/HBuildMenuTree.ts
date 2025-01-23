import { ICategory } from "@/interfaces";

const HBuildMenuTree = (categories: ICategory[]): ICategory[] => {
  const map = new Map<string, ICategory & { children: ICategory[] }>();

  // Khởi tạo danh mục với children rỗng
  categories.forEach((cat) => map.set(cat._id, { ...cat, children: [] }));

  return categories.reduce<ICategory[]>((tree, cat) => {
    const node = map.get(cat._id)!;

    if (cat.parent) {
      map.get(cat.parent)?.children.push(node);
    } else {
      tree.push(node);
    }
    return tree;
  }, []);
};
export default HBuildMenuTree;
