import React, { useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setFilter } from "@/store/reducers/adminOrderSlice";
import {
  OrderStatusDataAdmin,
  PaymentMethodData,
  PaymentStatusData,
} from "@/utils/constantData";
import dayjs from "dayjs";
import adminApi from "@/api/adminApi";

const { RangePicker } = DatePicker;

const OrderFilter = () => {
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector((state) => state.adminOrder);

  const [filterData, setFilterData] = useState({
    orderCode: "",
    phoneNumber: "",
    status: [],
    paymentStatus: null,
    paymentMethod: null,
    dateTime: [null, null],
  });

  const cancelStatuses = ["Cancel", "Cancel Confirm"];
  const showDeleteAllButton = filterData.status.some((status) =>
    cancelStatuses.includes(status)
  );

  const onChangeFilter = (key, value) => {
    setFilterData((prev) => {
      const newFilterData = { ...prev, [key]: value };
      if (key === "status" && Array.isArray(value)) {
        newFilterData.status = value;
      }
      handleSearch(newFilterData);
      return newFilterData;
    });
  };

  const handleSearch = (newFilterData = filterData) => {
    const payload = {
      phoneNumber: newFilterData.phoneNumber,
      orderCode: newFilterData.orderCode,
      status: newFilterData.status.length > 0 ? newFilterData.status : null, // Gửi mảng trực tiếp
      paymentStatus: newFilterData.paymentStatus,
      paymentMethod: newFilterData.paymentMethod,
      fromDate: newFilterData.dateTime?.[0]
        ? dayjs(newFilterData.dateTime?.[0]).format("YYYY-MM-DD")
        : null,
      toDate: newFilterData.dateTime?.[1]
        ? dayjs(newFilterData.dateTime?.[1]).format("YYYY-MM-DD")
        : null,
    };
  
    console.log("Payload gửi lên API:", payload); // Ghi log để kiểm tra
  
    dispatch(setFilter(payload));
    dispatch(fetchOrders());
  };

  const handleDeleteAll = async () => {
    const ordersToDelete = orders
      .filter((order) => cancelStatuses.includes(order.status))
      .map((order) => order.id);

    if (ordersToDelete.length === 0) {
      alert("Không có đơn hàng nào để xóa.");
      return;
    }

    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa ${ordersToDelete.length} đơn hàng không?`
    );
    if (!confirmDelete) return;

    try {
      await Promise.all(
        ordersToDelete.map((id) => adminApi.deleteOrder({ id }))
      );
      alert("Xóa đơn hàng thành công!");
      dispatch(fetchOrders());
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      alert("Xóa đơn hàng thất bại!");
    }
  };

  return (
    <div className="filter-data flex gap-2">
      <div className="control-area flex items-center gap-2 flex-wrap flex-1">
        <Input
          className="!w-99"
          value={filterData.orderCode}
          placeholder={"Mã đơn hàng"}
          maxLength={200}
          onChange={(val) => onChangeFilter("orderCode", val.target.value)}
        />
        <Input
          className="!w-99"
          value={filterData.phoneNumber}
          placeholder={"Số điện thoại KH"}
          maxLength={10}
          onChange={(val) => onChangeFilter("phoneNumber", val.target.value)}
        />
        <Select
          mode="multiple"
          placeholder="Trạng thái đơn"
          className="!w-99"
          value={filterData.status}
          onChange={(value) => onChangeFilter("status", value)}
          allowClear
          options={OrderStatusDataAdmin}
        />
        <Select
          placeholder="Trạng thái thanh toán"
          className="!w-99"
          value={filterData.paymentStatus}
          onChange={(value) => onChangeFilter("paymentStatus", value)}
          allowClear
          options={PaymentStatusData}
        />
        <Select
          placeholder="Phương thức thanh toán"
          className="!w-99"
          value={filterData.paymentMethod}
          onChange={(value) => onChangeFilter("paymentMethod", value)}
          allowClear
          options={PaymentMethodData}
        />
        <RangePicker
          className="!w-99 h-8"
          value={filterData.dateTime}
          onChange={(dates) => onChangeFilter("dateTime", dates)}
          format="DD/MM/YYYY"
        />
      </div>
      <div className="flex items-center gap-2 !w-1/4">
        <Button type="primary" onClick={handleSearch} loading={loading}>
          Tìm kiếm
        </Button>
        {/* {showDeleteAllButton && (
            <Button type="primary" danger onClick={handleDeleteAll}>
              Xóa toàn bộ
            </Button>
          )} */}
      </div>
    </div>
  );
};

export default OrderFilter;