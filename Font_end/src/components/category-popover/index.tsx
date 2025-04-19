import { useState } from "react";
import { Popover } from "antd";
import { RightOutlined } from "@ant-design/icons";

export interface IDataItem {
  id: string | number;
  icon: React.ReactNode;
  name: string;
  children?: IDataItem[];
}

interface CategoryPopoverProps {
  isMobile: boolean;
  dataItems: IDataItem[];
  onChange: (values: IDataItem[]) => void;
  onChangeLastItem?: boolean; // true: Chỉ gọi onChange khi chọn item cuối cùng, false: Gọi onChange ngay lập tức
}

const CategoryPopover: React.FC<CategoryPopoverProps> = ({
  isMobile = false,
  dataItems = [],
  onChange,
  onChangeLastItem = true, // Mặc định chỉ gọi onChange khi chọn item cuối cùng
}) => {
  const [open, setOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<IDataItem[]>([]);

  /**
   * Hàm cập nhật selectedPath để mở subChildren
   */
  const updateSelectedPath = (category: IDataItem, level: number) => {
    const newPath = selectedPath.slice(0, level);
    newPath[level] = category;
    setSelectedPath(newPath);
    return newPath;
  };

  /**
   * Hàm xử lý khi chọn item (click hoặc hover tùy theo onChangeLastItem)
   */
  const handleSelect = (category: IDataItem, level: number) => {
    if (onChangeLastItem) {
      const value = updateSelectedPath(category, level);
      if (!category.children || category.children.length === 0) {
        onChange(value);
        setOpen(false); // Đóng popover
      }
    } else {
      onChange(selectedPath);
      setOpen(false); // Đóng popover
    }
  };
  const handleHover = (category: IDataItem, level: number) => {
    updateSelectedPath(category, level);

    // if (onChangeLastItem) {
    //   // Trường hợp chỉ gọi onChange khi chọn item cuối cùng
    //   if (!category.children || category.children.length === 0) {
    //     onChange(selectedPath.concat(category)); // Gọi onChange với danh sách đã chọn
    //     setOpen(false); // Đóng popover
    //   }
    // } else {
    //   // Trường hợp gọi onChange ngay khi chọn item
    //   onChange(selectedPath.concat(category));
    // }
  };

  /**
   * Hàm reset selection khi mở popover mới
   */
  const resetSelection = () => setSelectedPath([]);

  const content = (
    <div className="flex bg-white">
      {Array.from({ length: selectedPath.length + 1 }).map((_, level) => {
        const parent = level === 0 ? null : selectedPath[level - 1];
        const items = level === 0 ? dataItems : parent?.children || [];
        const hasChildren = items.some(
          (e) => e.children && e.children.length > 0
        );

        return items.length > 0 ? (
          <div
            key={level}
            className={`min-w-[150px] p-1 ${
              level < selectedPath.length && hasChildren
                ? "border-r border-gray-300"
                : ""
            }`}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 ${
                  selectedPath[level]?.id === item.id ? "bg-blue-200" : ""
                }`}
                onClick={
                  onChangeLastItem ? () => handleSelect(item, level) : undefined
                }
                onMouseEnter={
                  !onChangeLastItem ? () => handleHover(item, level) : undefined
                }
              >
                <span>
                  {item.icon} {item.name}
                </span>
                {item.children && item.children.length > 0 && (
                  <RightOutlined className="text-xs" />
                )}
              </div>
            ))}
          </div>
        ) : null;
      })}
    </div>
  );

  return (
    <Popover
      rootClassName="!z-[1032]"
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
    >
      <button
        className={`${
          isMobile
            ? "text-[#1677ff] cursor-pointe text-lg flex"
            : "hover:text-blue-500 cursor-pointer"
        }`}
        onClick={resetSelection}
      >
        Chọn danh mục
      </button>
    </Popover>
  );
};

export default CategoryPopover;
