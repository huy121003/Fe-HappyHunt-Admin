import React, { useState, useEffect } from 'react';
import { InputNumber, Slider, Flex, Typography, Card } from 'antd';
import { debounce } from 'lodash';
import { DollarOutlined } from '@ant-design/icons';

interface PriceRangeProps {
  minValue?: number;
  maxValue?: number;
  onMinChange?: (value: number | undefined) => void;
  onMaxChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
}

const CPriceRange: React.FC<PriceRangeProps> = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  min = 0,
  max = 1000000,
  step = 1000,
}) => {
  const [minPrice, setMinPrice] = useState<number | undefined>(minValue);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(maxValue);

  // Update component state when props change
  useEffect(() => {
    setMinPrice(minValue);
  }, [minValue]);

  useEffect(() => {
    setMaxPrice(maxValue);
  }, [maxValue]);

  // Handle min price change
  const handleMinChange = (value: number | null) => {
    const newValue = value !== null ? value : undefined;
    setMinPrice(newValue);

    if (onMinChange) {
      debouncedMinChange(newValue);
    }
  };

  // Handle max price change
  const handleMaxChange = (value: number | null) => {
    const newValue = value !== null ? value : undefined;
    setMaxPrice(newValue);

    if (onMaxChange) {
      debouncedMaxChange(newValue);
    }
  };

  // Debounced callbacks to prevent too many updates
  const debouncedMinChange = debounce((value: number | undefined) => {
    if (onMinChange) onMinChange(value);
  }, 500);

  const debouncedMaxChange = debounce((value: number | undefined) => {
    if (onMaxChange) onMaxChange(value);
  }, 500);

  // Calculate slider values for display
  const sliderValues: [number, number] = [minPrice ?? min, maxPrice ?? max];

  // Handle slider range change
  const handleSliderChange = (values: [number, number]) => {
    const [newMin, newMax] = values;
    setMinPrice(newMin);
    setMaxPrice(newMax);

    if (onMinChange) debouncedMinChange(newMin);
    if (onMaxChange) debouncedMaxChange(newMax);
  };

  return (
    <Card
      className="price-range-container min-w-[500px]"
      size="small"
      bodyStyle={{ padding: 12 }}
    >
      <Typography.Text strong style={{ display: 'block', marginBottom: 12 }}>
        <DollarOutlined style={{ marginRight: 8 }} />
        Price Range
      </Typography.Text>
      <Flex vertical gap={16}>
        <Slider
          range
          min={min}
          max={max}
          step={step}
          value={sliderValues}
          onChange={handleSliderChange}
          tooltip={{
            formatter: (value) => `${value?.toLocaleString() || 0}`,
          }}
          marks={{
            [min]: `${min.toLocaleString()}`,
            [max]: `${max.toLocaleString()}`,
          }}
        />
        <Flex justify="space-between" align="center">
          <InputNumber
            size="large"
            value={minPrice}
            onChange={handleMinChange}
            min={min}
            max={maxPrice || max}
            step={step}
            placeholder="Min Price"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) =>
              value ? Number(value.replace(/\$\s?|(,*)/g, '')) : 0
            }
            style={{ width: '48%' }}
            prefix="From"
            controls={false}
          />
          <InputNumber
            size="large"
            value={maxPrice}
            onChange={handleMaxChange}
            min={minPrice || min}
            max={max}
            step={step}
            placeholder="Max Price"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) =>
              value ? Number(value.replace(/\$\s?|(,*)/g, '')) : 0
            }
            style={{ width: '48%' }}
            prefix="To"
            controls={false}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default CPriceRange;
