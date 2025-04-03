import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ICartStorage } from "../types/interface";
import { Dispatch } from "@reduxjs/toolkit";
import { RcFile } from "antd/es/upload";
import { EuropeanDatetimeMinuteFormatDayjs, OrderStatus } from "./constants";
dayjs.extend(customParseFormat);

export function truncateString(
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr: string
) {
  if (!str) {
    return "";
  }

  if (!Number.isInteger(frontLen) || !Number.isInteger(backLen)) {
    throw `${frontLen} and ${backLen} should be an Integer`;
  }

  const strLen = str.length;
  truncateStr = truncateStr || "…";
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str;
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr;
  } else {
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen);
  }
}

export const convertDate = (inputDate: string): string => {
  const validFormats = [
    "D MMM YYYY",
    "DD/MM/YYYY",
    "YYYY-MM-DD",
    "DD-MM-YYYY",
    "DD-M-YYYY",
    "D/M/YYYY",
    "0/0/YYYY",
  ];
  for (const format of validFormats) {
    const date = dayjs(String(inputDate), format, true);
    if (date.isValid()) {
      if (format === "0/0/YYYY") {
        return dayjs(`01/01/${date.year()}`, "DD/MM/YYYY").format("DD/MM/YYYY");
      }
      return date.format("DD/MM/YYYY");
    }
  }

  return inputDate;
};

export const getFileFormatByName = (fileName: string) => {
  const fileNameSplitByDot = fileName.split(".");
  const formatType =
    fileNameSplitByDot?.length > 0
      ? fileNameSplitByDot[fileNameSplitByDot?.length - 1]
      : "";
  return formatType;
};

/**
 * tải file xuống
 * @param {*} uri
 * @param {*} name
 */
export const downloadFile = (uri: string, name: string) => {
  fetch(uri)
    .then((res) => res.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", name);
      //link.href = uri;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    });
};
/**
 * tải file xuống bằng data blob
 * @param {*} uri
 * @param {*} name
 */
export const downloadFileBlob = (blob: any, name: string) => {
  const blobUrl = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = blobUrl;
  link.setAttribute("download", name);
  //link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

export const renderValue = (value?: any) => {
  return value ? value : "--";
};

export const getDisCountPercent = (priceRegular: number, priceSale: number) => {
  return priceSale ? 100 - (priceSale / priceRegular) * 100 : 0;
};

export const addToCart = (
  productId: number | undefined,
  selectedColor: string,
  selectedSize: string,
  quantity: number,
  dispatch: Dispatch
) => {
  // Lấy giỏ hàng từ localStorage
  const cart: ICartStorage[] = JSON.parse(localStorage.getItem("cart") || "[]");

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProductIndex = cart.findIndex(
    (item) =>
      item.productId === productId &&
      item.color === selectedColor &&
      item.size === selectedSize
  );

  if (existingProductIndex !== -1) {
    // Nếu đã có, cập nhật số lượng
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Nếu chưa có, thêm mới
    cart.push({
      productId,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  }

  // Cập nhật lại localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Dispatch action để cập nhật Redux store
  dispatch({ type: "cart/setCartCount", payload: cart.length });
};

export const objectToFormData = (
  obj: Record<string, any>,
  form?: FormData,
  namespace = ""
): FormData => {
  const formData = form || new FormData();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const formKey = namespace ? `${namespace}[${key}]` : key;

      if (value instanceof File || value instanceof Blob) {
        // Nếu giá trị là File hoặc Blob thì append trực tiếp
        formData.append(formKey, value);
      } else if (Array.isArray(value)) {
        if (value.length > 0 && value[0] instanceof File) {
          // Nếu mảng chứa File, append từng file riêng lẻ
          value.forEach((file, index) => {
            formData.append(`${formKey}[${index}]`, file);
          });
        } else {
          // Nếu mảng chứa dữ liệu khác (số, chuỗi, object) => stringify
          formData.append(formKey, JSON.stringify(value));
        }
      } else if (typeof value === "object" && value !== null) {
        // Nếu là object (không phải file), stringify
        formData.append(formKey, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        // Các giá trị thông thường (string, number, boolean)
        formData.append(formKey, value.toString());
      }
    }
  }

  return formData;
};

export const getLabelByValue = (
  list: { label: string; value: any }[],
  value: any
): string => {
  const item = list.find((item) => item.value === value);
  return item ? item.label : "";
};
export const urlToFile = async (
  url: string,
  fileName: string
): Promise<RcFile> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type }) as RcFile;
  file.uid = `${Date.now()}`; // Thêm uid để tránh lỗi
  return file;
};

export const maskPhoneNumber = (phone: string) => {
  if (phone?.length !== 10) return "Số không hợp lệ"; // Kiểm tra độ dài số điện thoại
  return phone.replace(/(\d{3})\d{3}(\d{4})/, "$1***$2");
};

export const formatData = (value: any, format?: string) => {
  if (!value) return "";
  const formatDate = format || EuropeanDatetimeMinuteFormatDayjs;
  return dayjs(value).format(formatDate) || "";
};

export const getColorOrderStatus = (status: string) => {
  switch (status) {
    case OrderStatus.UNCONFIRMED:
      return "default"; // Chưa xác nhận (màu xám)
    case OrderStatus.CONFIRMED:
      return "blue"; // Đã xác nhận
    case OrderStatus.CANCEL_CONFIRM:
      return "red";
    case OrderStatus.PROCESSING:
      return "purple"; // Đang chuẩn bị hàng
    case OrderStatus.SHIPPING:
      return "orange"; // Đang vận chuyển
    case OrderStatus.DELIVERED:
      return "green"; // Đã giao hàng
    case OrderStatus.CANCEL:
      return "red"; // Đã hủy
    default:
      return "default";
  }
};

export const getNameOfItemListByValue = (
  list: any[],
  value: any,
  valueField: string,
  nameField: string
): string => {
  const item = list.find((item) => item[valueField] === value);
  return item ? item[nameField] : "";
};
