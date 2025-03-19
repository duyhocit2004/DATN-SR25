import React, { CSSProperties, useEffect, useState } from "react";
import { Button, InputNumber } from "antd";
import "./index.scss";

interface QuantitySelectorProps {
  initialValue?: number;
  min?: number;
  max?: number;
  style?: CSSProperties;
  onChange: (value: number) => void;
  value: number;
  readonly?: boolean;
}
const QuantitySelector = ({
  initialValue = 1,
  min = 1,
  max = 99999999,
  style,
  onChange,
  value = 1,
  readonly = true,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialValue);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  // Hàm tăng số lượng
  const increment = () => {
    if (quantity < max) {
      setQuantity(quantity + 1); // Tăng giá trị lên 1
      onChange(quantity + 1);
    }
  };

  // Hàm giảm số lượng
  const decrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1); // Giảm giá trị xuống 1
      onChange(quantity - 1);
    }
  };

  return (
    <div
      className="quantity-selector-container flex items-center h-6 sm:h-6 md:h-10"
      style={{ ...style }}
    >
      {/* Nút giảm */}
      <Button
        className="quantity-btn prev-btn !h-full w-6 sm:w-6 md:w-10"
        style={{ width: style?.height }}
        onClick={decrement}
        disabled={quantity <= min} // Disable khi quantity <= min
      >
        -
      </Button>
      {readonly ? (
        <div className="quantity-display flex-1 flex justify-center items-center h-full px-4">
          {quantity}
        </div>
      ) : (
        <InputNumber
          className="!rounded-none !border-x-0"
          value={quantity}
          min={0}
          controls={false}
          onChange={(value) => {
            setQuantity(value || 0);
            onChange(value || 0);
          }}
        />
      )}

      {/* Nút tăng */}
      <Button
        className="quantity-btn next-btn !h-full w-6 sm:w-6 md:w-10"
        style={{ width: style?.height }}
        onClick={increment}
        disabled={quantity >= max} // Disable khi quantity >= max
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
