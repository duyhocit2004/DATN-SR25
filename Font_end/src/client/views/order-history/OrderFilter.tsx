// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchOrders } from "@/store/reducers/orderSlice";
// import { OrderStatusDataClient } from "@/utils/constantData";
// import {
//   EuropeanDateFormatDayjs,
//   ISO8601DateFormatDayjs,
// } from "@/utils/constants";
// import { Button, DatePicker, Input, Select } from "antd";
// import dayjs, { Dayjs } from "dayjs";
// import { useState } from "react";

// const { RangePicker } = DatePicker;

// interface IFilterOrder {
//   orderCode: string;
//   phoneNumber?: string;
//   status: string | null;
//   dateTime: [Dayjs | null, Dayjs | null]; //(yyyy-mm-dd)
// }
// const OrderFilter = () => {
//   const dispatch = useAppDispatch();
//   const { loading, phoneNumber } = useAppSelector((state) => state.order);
//   const [filterData, setFilterData] = useState<IFilterOrder>({
//     orderCode: "",
//     status: null,
//     dateTime: [null, null],
//   });

//   const onChangeFilter = (key: string, value: any) => {
//     setFilterData((prev) => {
//       return {
//         ...prev,
//         [key]: value,
//       };
//     });
//   };

//   const handleFilter = () => {
//     const payload = {
//       phoneNumber: phoneNumber,
//       orderCode: filterData.orderCode,
//       status: filterData.status,
//       fromDate: filterData.dateTime?.[0]
//         ? dayjs(filterData.dateTime?.[0]).format(ISO8601DateFormatDayjs)
//         : null,
//       toDate: filterData.dateTime?.[1]
//         ? dayjs(filterData.dateTime?.[1]).format(ISO8601DateFormatDayjs)
//         : null,
//     };
//     dispatch(fetchOrders(payload));
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-3 mb-4">
//       <Input
//         placeholder="Tìm mã đơn hàng"
//         value={filterData.orderCode}
//         onChange={(e) => onChangeFilter("orderCode", e.target.value)}
//       />
//       <Select
//         placeholder="Trạng thái"
//         className="w-full"
//         value={filterData.status}
//         onChange={(value) => onChangeFilter("status", value)}
//         allowClear
//         options={OrderStatusDataClient}
//       ></Select>
//       <RangePicker
//         className="w-full h-8"
//         value={filterData.dateTime}
//         onChange={(dates) => onChangeFilter("dateTime", dates)}
//         format={EuropeanDateFormatDayjs}
//       />
//       <Button type="primary" loading={loading} onClick={handleFilter}>
//         Lọc
//       </Button>
//     </div>
//   );
// };
// export default OrderFilter;
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders } from "@/store/reducers/orderSlice";
import { OrderStatusDataClient } from "@/utils/constantData";
import {
  EuropeanDateFormatDayjs,
  ISO8601DateFormatDayjs,
} from "@/utils/constants";
import { Button, DatePicker, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

const { RangePicker } = DatePicker;

interface IFilterOrder {
  orderCode: string;
  phoneNumber?: string;
  status: string | null;
  dateTime: [Dayjs | null, Dayjs | null]; //(yyyy-mm-dd)
}

const OrderFilter = () => {
  const dispatch = useAppDispatch();
  const { loading, phoneNumber } = useAppSelector((state) => state.order);
  const [filterData, setFilterData] = useState<IFilterOrder>({
    orderCode: "",
    status: null,
    dateTime: [null, null],
  });

  const onChangeFilter = (key: string, value: any) => {
    setFilterData((prev) => {
      const newFilter = { ...prev, [key]: value };
      if (key === "status") {
        handleFilter(newFilter); // Gọi API ngay khi thay đổi trạng thái
      }
      return newFilter;
    });
  };

  const handleFilter = (data = filterData) => {
    const payload = {
      phoneNumber: phoneNumber,
      orderCode: data.orderCode,
      status: data.status,
      fromDate: data.dateTime?.[0]
        ? dayjs(data.dateTime?.[0]).format(ISO8601DateFormatDayjs)
        : null,
      toDate: data.dateTime?.[1]
        ? dayjs(data.dateTime?.[1]).format(ISO8601DateFormatDayjs)
        : null,
    };
    dispatch(fetchOrders(payload));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <Input
        placeholder="Tìm mã đơn hàng"
        value={filterData.orderCode}
        onChange={(e) => onChangeFilter("orderCode", e.target.value)}
      />
      <Select
        placeholder="Trạng thái"
        className="w-full"
        value={filterData.status}
        onChange={(value) => onChangeFilter("status", value)}
        allowClear
        options={OrderStatusDataClient}
      />
      <RangePicker
        className="w-full h-8"
        value={filterData.dateTime}
        onChange={(dates) => onChangeFilter("dateTime", dates)}
        format={EuropeanDateFormatDayjs}
      />
      <Button type="primary" loading={loading} onClick={() => handleFilter()}>
        Lọc
      </Button>
    </div>
  );
};

export default OrderFilter;
