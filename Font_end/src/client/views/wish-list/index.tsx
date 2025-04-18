import { useEffect, useMemo, useRef, useState } from "react";
import { Table, Button, Popconfirm, Card, Tooltip, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useWindowSize from "@/hooks/useWindowSize";
import { IWishlist } from "@/types/interface";
import { ColumnType } from "antd/es/table";
import { useAuth } from "@/context/AuthContext";
import { HttpCodeString } from "@/utils/constants";
import productApi from "@/api/productApi";
import { showToast } from "@/components/toast"; // Import showToast

const WishList = () => {
  const wishlistRef = useRef<IWishlist[]>([]);

  const [wishlist, setWishlist] = useState<IWishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useWindowSize(); // Kiểm tra nếu là màn hình nhỏ
  const { token } = useAuth();

  useEffect(() => {
    getWishlistInfo();
  }, [token]);
  useEffect(() => {
    wishlistRef.current = wishlist;
  }, [wishlist]);

  const getWishlistInfo = async () => {
    setLoading(true);
    try {
      if (token) {
        //callapi get wishlist
        const response = await productApi.getWishListByUserId();
        if (response.status === HttpCodeString.SUCCESS) {
          setWishlist(response.data);
        }
      } else {
        const productIds: string[] = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );

        const listWishlist = await getWishListStorage(productIds);

        setWishlist(listWishlist);
      }
    } catch {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const getWishListStorage = async (productIds: string[]) => {
    let listWishlist: IWishlist[] = [];
    //call api get product theo productId, size, color

    try {
      const payload = {
        productIds: productIds,
      };
      const response = await productApi.getWishListStorage(payload);
      if (response.status === HttpCodeString.SUCCESS) {
        listWishlist = response.data;
      }
    } finally {
      console.log("done");
    }
    return listWishlist;
  };

  const removeFromWishlist = async (id: number | null) => {
    if (!id) {
      showToast({
        content: "Xóa sản phẩm thất bại!",
        duration: 5,
        type: "error",
      });
      return;
    }
    if (token) {
      removeWishlistApi(id);
    } else {
      removeWishlistStorage(id);
    }
  };

  const removeWishlistApi = async (id: number | null) => {
    try {
      const response = await productApi.removeWishList({
        productIds: id ? [id] : null,
      });

      if (response.status === HttpCodeString.SUCCESS) {
        updateWishlistAfterRemoveItem(id);
        showToast({
          content: "Xóa sản phẩm thành công!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Xóa sản phẩm thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch {}
  };

  const removeWishlistStorage = (id: number | null) => {
    if (id) {
      const wishlistStorage: string[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlistStorage.filter((item) => item !== id.toString()))
      );
    } else {
      localStorage.removeItem("wishlist");
    }
    updateWishlistAfterRemoveItem(id);
    showToast({
      content: "Đã xóa sản phẩm khỏi giỏ hàng!",
      duration: 5,
      type: "success",
    });
  };

  const updateWishlistAfterRemoveItem = (id: number | null) => {
    let newWishlist: IWishlist[] = [];
    if (id) {
      newWishlist = wishlistRef.current?.filter((item) => item?.id !== id);
    }
    setWishlist(newWishlist);
  };

  const clearWishlist = () => {
    if (token) {
      removeWishlistApi(null);
    } else {
      removeWishlistStorage(null);
    }
  };

  const columns = useMemo(() => {
    let result: ColumnType<IWishlist>[] = [];
    if (!isMobile) {
      result.push({
        title: "Ảnh",
        dataIndex: "product.image",
        key: "listImage",
        render: (_: string, record: IWishlist) =>
          record?.image ? (
            <img src={record?.image} alt="product" className="w-12" />
          ) : null,
      });
    }
    result = result.concat([
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
        responsive: ["xs", "sm", "md", "lg"],
        render: (_: any, record: IWishlist) => {
          return (
            <Link to={`/products/${record.id}`} className="name mb-1 font-semibold text-xl text-blue-200 hover:underline">
              {record?.name}
            </Link>
          );
        },
      },
      
      {
        title: "Giá",
        dataIndex: "priceRegular",
        key: "price",
        render: (_: any, record: IWishlist) => {
          return (
            <div className="price">
              {record?.priceSale && (
                <div className="price-old text-gray-400 line-through text-sm">
                  {record?.priceRegular?.toLocaleString()} đ
                </div>
              )}
              <div className="price-new text-red-600 text-lg font-bold ml-2">
                {record?.priceSale?.toLocaleString() ||
                  record?.priceRegular?.toLocaleString()}{" "}
                đ
              </div>
            </div>
          );
        },
      },
      {
        title: "Hành động",
        key: "action",
        fixed: 'right',
        render: (_: any, record: IWishlist) => (
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => removeFromWishlist(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title={"Xóa"}>
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        ),
      },
    ]);
    return result;
  }, [isMobile]);

  return (
    <div className="container mx-auto py-4 px-4 md:px-6 md:py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center mb-8">
        Sản phẩm yêu thích
      </h2>

      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Spin size="large" />
        </div>
      )}

      {wishlist.length > 0 ? (
        <Card className="!bg-gray-100">
          <Table
            columns={columns}
            rowKey={"id"}
            dataSource={wishlist}
            pagination={false}
            // scroll={isMobile ? { x: 600 } : undefined}
          />

          <div className="flex flex-col md:flex-row justify-between mt-6 gap-3">
            <Link to="/shop" className="w-full md:w-auto">
              <Button type="default" block={isMobile}>
                🛍 Tiếp tục Shopping
              </Button>
            </Link>
            <Popconfirm
              title="Bạn có chắc muốn xóa toàn bộ giỏ hàng?"
              onConfirm={clearWishlist}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger block={isMobile}>
                🗑 Xóa danh sách
              </Button>
            </Popconfirm>
          </div>
        </Card>
      ) : (
        <p className="text-center text-gray-500">
          Danh sách sản phẩm yêu thích của bạn đang trống!
        </p>
      )}
    </div>
  );
};

export default WishList;
