import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setFilter } from "@/store/reducers/adminOrderSlice";
import {
  OrderStatusData,
  PaymentMethodData,
  PaymentStatusData,
} from "@/utils/constantData";
import {
  EuropeanDateFormatDayjs,
  ISO8601DateFormatDayjs,
} from "@/utils/constants";
import { Button, DatePicker, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface IFilterData {
  orderCode: string;
  phoneNumber?: string;
  status: string | null;
  paymentStatus: string | null;
  paymentMethod: string | null;
  dateTime: [Dayjs | null, Dayjs | null]; //(yyyy-mm-dd)
}

const { RangePicker } = DatePicker;

const OrderFilter = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.adminOrder);
  const [filterData, setFilterData] = useState<IFilterData>({
    orderCode: "",
    phoneNumber: "",
    status: null,
    paymentStatus: null,
    paymentMethod: null,
    dateTime: [null, null], //(yyyy-mm-dd)
  });
  const onChangeFilter = (key: string, value: any) => {
    setFilterData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleSearch = () => {
    const payload = {
      phoneNumber: filterData.phoneNumber,
      orderCode: filterData.orderCode,
      status: filterData.status,
      fromDate: filterData.dateTime?.[0]
        ? dayjs(filterData.dateTime?.[0]).format(ISO8601DateFormatDayjs)
        : null,
      toDate: filterData.dateTime?.[1]
        ? dayjs(filterData.dateTime?.[1]).format(ISO8601DateFormatDayjs)
        : null,
    };
    dispatch(setFilter(payload));
    dispatch(fetchOrders());
  };
  return (
    <div className="filter-data flex gap-2">
      <div className="control-area flex items-center gap-2 flex-wrap flex-1">
        <Input
          className="!w-96"
          value={filterData.orderCode}
          placeholder={"Mã đơn hàng"}
          defaultValue={""}
          maxLength={200}
          onChange={(val) => {
            onChangeFilter("orderCode", val.target.value);
          }}
        />
        <Input
          className="!w-96"
          value={filterData.phoneNumber}
          placeholder={"Số điện thoại KH"}
          defaultValue={""}
          maxLength={10}
          onChange={(val) => {
            onChangeFilter("phoneNumber", val.target.value);
          }}
        />
        <Select
          placeholder="Trạng thái đơn"
          className="!w-96"
          value={filterData.status}
          onChange={(value) => onChangeFilter("status", value)}
          allowClear
          options={OrderStatusData}
        ></Select>
        <Select
          placeholder="Trạng thái thanh toán"
          className="!w-96"
          value={filterData.paymentStatus}
          onChange={(value) => onChangeFilter("paymentStatus", value)}
          allowClear
          options={PaymentStatusData}
        ></Select>
        <Select
          placeholder="Phương thức thanh toán"
          className="!w-96"
          value={filterData.paymentMethod}
          onChange={(value) => onChangeFilter("paymentMethod", value)}
          allowClear
          options={PaymentMethodData}
        ></Select>
        <RangePicker
          className="!w-96 h-8"
          value={filterData.dateTime}
          onChange={(dates) => onChangeFilter("dateTime", dates)}
          format={EuropeanDateFormatDayjs}
        />
      </div>
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};
export default OrderFilter;
