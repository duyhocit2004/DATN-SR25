import { Card, Rate, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/types/interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dispatchAction } from "@/store/actionHelper";
import { cloneDeep } from "lodash";
import { getDisCountPercent } from "@/utils/functions";
import { useAuth } from "@/context/AuthContext";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { listWishlist } = useAppSelector((state) => state.wishlist);
  const { token } = useAuth(); // Kiểm tra user có đăng nhập không

  // Lấy danh sách wishlist từ localStorage
  const [isWishlisted, setIsWishlisted] = useState<boolean>(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.includes(product?.id);
  });

  useEffect(() => {
    if (listWishlist && product) {
      const includeProduct = listWishlist.find((e) => e.id === product?.id);
      setIsWishlisted(!!includeProduct);
    } else {
      setIsWishlisted(false);
    }
  }, [listWishlist, product]);

  // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
  // const [isInCart, setIsInCart] = useState<boolean>(() => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   return cart.some((item: IProduct) => item.id === product?.id);
  // });

  // Xử lý thêm/xóa wishlist
  const handleWishlist = async (e: React.MouseEvent, value: boolean) => {
    e.stopPropagation();
    if (token) {
      if (value) {
        // 🟢 Nếu user đã login → gọi API để thêm vào wishlist
        const response = await productApi.addWishList({
          productId: product?.id,
        });
        if (response.status === HttpCodeString.SUCCESS) {
          dispatch(dispatchAction("wishlist/addToWishlist", null));
        }
      } else {
        //Bỏ yêu thích
        const response = await productApi.removeWishList({
          productId: product?.id ? [product?.id] : null,
        });
        if (response.status === HttpCodeString.SUCCESS) {
          dispatch(dispatchAction("wishlist/removeFromWishlist", null));
        }
      }
    } else {
      // 🔴 Nếu chưa login → Cập nhật localStorage
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      let updatedWishlist = cloneDeep(wishlist);
      if (wishlist) {
        updatedWishlist.push(product?.id);
        dispatch(dispatchAction("wishlist/addToWishlist", null));
      } else {
        updatedWishlist = wishlist.filter((id: number) => id !== product?.id);
        dispatch(dispatchAction("wishlist/removeFromWishlist", null));
      }

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }

    setIsWishlisted(!isWishlisted);
  };

  // Xử lý thêm vào giỏ hàng
  // const handleAddToCart = async (e: React.MouseEvent) => {
  //   e.stopPropagation();

  //   if (user) {
  //     // 🟢 Nếu user đã login → Gọi API cập nhật giỏ hàng
  //     try {
  //       await fetch("/api/cart", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ productId: product?.id, quantity: 1 }),
  //       });
  //       console.log("Cập nhật giỏ hàng thành công!");
  //     } catch (error) {
  //       console.error("Lỗi khi cập nhật giỏ hàng:", error);
  //     }
  //   } else {
  //     // 🔴 Nếu chưa login → Cập nhật localStorage
  //     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //     const updatedCart = [...cart, { ...product, quantity: 1 }];
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   }

  //   setIsInCart(true);
  // };

  // Chuyển sang trang chi tiết sản phẩm
  const goToDetail = () => {
    navigate(`/products/${product?.id}`);
  };

  // Tính toán giá sau khi giảm
  // const discountValue = parseFloat(product?.discount);
  // const discountedPrice = Math.round(product?.price * (1 - discountValue / 100));
  const discountValue = getDisCountPercent(
    product?.priceRegular,
    product?.priceSale
  );

  return (
    <Card
      hoverable
      className="relative rounded-lg overflow-hidden group transition-all border-none shadow-lg"
      styles={{ body: { padding: 0 } }}
    >
      {/* Wrapper chứa ảnh và badge giảm giá */}
      <div className="relative cursor-pointer" onClick={goToDetail}>
        {/* Badge giảm giá */}
        {discountValue > 0 && (
          <div className="absolute top-2 right-2 z-10 transition-transform duration-300 group-hover:scale-110">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-bounce">
              -{discountValue}%
            </span>
          </div>
        )}

        {/* Ảnh sản phẩm */}
        <div className="overflow-hidden">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Actions (hiện khi hover) */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[40px] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
          {/* Nút Wishlist */}
          <Tooltip
            title={isWishlisted ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
          >
            <button
              className={`cursor-pointer w-[40px] h-[40px] border-none text-white ${isWishlisted ? "bg-red-500" : "bg-blue-800"
                } hover:bg-gray-900 transition-all`}
              onClick={(e) => {
                handleWishlist(e, !isWishlisted);
              }}
            >
              <HeartOutlined className="text-xl" />
            </button>
          </Tooltip>

          {/* Nút Thêm vào giỏ hàng */}
          <button
            className={`cursor-pointer flex-1 h-[40px] border-l text-white uppercase bg-blue-800 hover:bg-gray-900 transition-all`}
            onClick={goToDetail}
          >
            Select Options
          </button>
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-4 text-center">
        <h3
          className="font-medium text-lg cursor-pointer transition-colors duration-300 hover:text-blue-500"
          onClick={goToDetail}
        >
          {product?.name}
        </h3>
        <Rate
          style={{ marginTop: 8 }}
          disabled
          allowHalf
          value={product?.rate}
        />
        <div className="mt-2">
          <div>
            <span
              className={`${!product?.priceSale
                ? "text-red-600 text-lg font-bold ml-2"
                : "text-gray-400 line-through text-sm"
                }`}
            >
              {product?.priceRegular?.toLocaleString()} VND
            </span>
          </div>
          {product?.priceSale && (
            <div>
              <span className="text-red-600 text-lg font-bold ml-2">
                {product?.priceSale?.toLocaleString()} VND
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
