import { SelectProps } from 'antd';
import { ICategoryItem } from '../../data/interface';
import CategoryService from '../../service';
import useLoadMore, { IFilters } from '@/hooks/useLoadMore';
import { API_KEY } from '../../data/constant';
import { useMemo } from 'react';
import CInfiniteSelect from '@/components/CInfiniteSelect';

interface IProps extends SelectProps {
  defaultSelected?: Partial<ICategoryItem>[];
}
type ILabelRender = SelectProps['labelRender'];

const SelectCategoryParent: React.FC<IProps> = ({
  defaultSelected,
  ...props
}) => {
  const fetchFn = ({ search, ...filter }: IFilters) => {
    return CategoryService.getParent({
      ...filter,
      ...(search && { name: search }),
      page: filter.page,
      size: filter.size,
    });
  };

  const { items, ...loadMore } = useLoadMore<ICategoryItem>({
    key: API_KEY.GET_CATEGORY_PARENT,
    fetchFn,
  });

  const options = useMemo(() => {
    return items.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  }, [items]);

  const labelRender: ILabelRender = (props) => {
    const { label } = props;
    return (
      label || defaultSelected?.find((item) => item._id === props.value)?.name
    );
  };

  return (
    <CInfiniteSelect
      {...props}
      options={options}
      labelRender={labelRender}
      {...loadMore}
    />
  );
};

export default SelectCategoryParent;
