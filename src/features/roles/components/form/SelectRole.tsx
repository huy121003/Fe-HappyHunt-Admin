import { SelectProps } from 'antd';
import { IRoleItem } from '../../data/interface';
import useLoadMore, { IFilters } from '@/hooks/useLoadMore';
import { API_KEY } from '../../data/constant';
import { useMemo } from 'react';
import CInfiniteSelect from '@/components/CInfiniteSelect';
import DistrictsService from '../../service';

interface IProps extends SelectProps {
  defaultSelected?: Partial<IRoleItem>[];
}
type ILabelRender = SelectProps['labelRender'];

const SelectRole: React.FC<IProps> = ({
  defaultSelected,
  ...props
}) => {
  const fetchFn = ({ search, ...filter }: IFilters) => {
    return DistrictsService.getAll({
      ...filter,
      name: search || '',
    });
  };

  const { items, ...loadMore } = useLoadMore<IRoleItem>({
    key: API_KEY.ROLES,
    fetchFn,
  });

  const options = useMemo(() => {
    return items.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  }, [items]);

  const labelRender: ILabelRender = (props) => {
    const { label, value } = props;
    return (
      label || defaultSelected?.find((item) => item._id === value)?.name || ''
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
export default SelectRole;