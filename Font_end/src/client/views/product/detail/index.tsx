import React, { useEffect, useState } from "react";
import { Rate, Collapse, Radio, RadioChangeEvent, Tooltip, Spin } from "antd";
import Gallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import QuantitySelector from "@/components/quantity-selector";
import {
  ICartStorage,
  IColor,
  IProduct,
  IResponseSize,
  ISize,
} from "@/types/interface";
import icHeartOutline from "@/assets/icons/ic-heart-outline.svg";
import icHeartFill from "@/assets/icons/ic-heart-fill.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dispatchAction } from "@/store/actionHelper";
import { cloneDeep } from "lodash";
import RelatedProducts from "../components/RelatedProducts";
import Reviews from "../components/Reviews";
import { addToCart } from "@/utils/functions";
import { useParams, useSearchParams } from "react-router-dom";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import PageLoading from "@/components/page-loading";
import { useAuth } from "@/context/AuthContext";
import cartApi from "@/api/cartApi";
import { showToast } from "@/components/toast"; // Import showToast

const ProductDetail = () => {
  const { token } = useAuth();
  const { listWishlist } = useAppSelector((state) => state.wishlist);
  const params = useParams();
  const dispatch = useAppDispatch();
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizes, setSizes] = useState<IResponseSize[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);
  const [notExistProduct, setNotExistProduct] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  useEffect(() => {
    if (listWishlist && productDetail) {
      const includeProduct = listWishlist.find(
        (e) => e.id === productDetail?.id
      );
      setIsWishlisted(!!includeProduct);
    } else {
      setIsWishlisted(false);
    }
  }, [listWishlist, productDetail]);
  useEffect(() => {
    getSizeByProductIdAndColor();
    setQuantity(0);
  }, [params.productId, selectedColor]);
  useEffect(() => {
    setMaxQuantity(sizes?.find((e) => e.size === selectedSize)?.quantity || 0);
    setQuantity(0);
  }, [selectedSize]);
  useEffect(() => {
    const productId = params.productId;
    //call api get danh sách product
    if (productId && !Number.isNaN(productId)) {
      getProductDetail(Number(productId));
    } else {
      setProductDetail(null);
      setNotExistProduct(true);
    }
  }, [params.productId]);

  const getSizeByProductIdAndColor = async () => {
    try {
      if (!productDetail?.id || !selectedColor) return;
      const response = await productApi.getSizeByProductIdAndColor({
        productId: productDetail?.id,
        color: selectedColor,
      });
      if (response?.status === HttpCodeString.SUCCESS) {
        setSizes(response.data);
      } else {
        setSizes([]);
      }
    } catch {
      setSizes([]);
    }
  };
  const getProductDetail = async (id: number) => {
    try {
      setLoading(true);
      const response = await productApi.getProduct(id);
      if (response?.status === HttpCodeString.SUCCESS) {
        setProductDetail(response.data);
        setNotExistProduct(false);
        setColors(response.data?.listColors);
        if (response.data?.listColors?.length > 0) {
          setSelectedColor(response.data?.listColors[0]);
        } else {
          setSelectedColor(null);
        }
      } else {
        setProductDetail(null);
        setColors([]);
        setSelectedColor(null);
      }
    } catch {
      setProductDetail(null);
      setColors([]);
      setSelectedColor(null);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (token) {
      // 🟢 Nếu user đã login → Gọi API cập nhật giỏ hàng
      try {
        const payload = {
          productId: productDetail?.id,
          quantity: quantity,
          color: selectedColor,
          size: selectedSize,
        };
        const response = await cartApi.addToCart(payload);
        if (response.status === HttpCodeString.SUCCESS) {
          dispatch({ type: "cart/addToCart" });
          showToast({
            content: "Thêm giỏ hàng thành công!",
            duration: 5,
            type: "success",
          });
        } else {
          showToast({
            content: "Thêm giỏ hàng thất bại!",
            duration: 5,
            type: "error",
          });
        }
      } catch { }
    } else {
      addToCart(
        productDetail?.id,
        selectedColor || "",
        selectedSize || "",
        quantity,
        dispatch
      );
    }
  };

  const handleWishlist = async (e: React.MouseEvent, wishlist: boolean) => {
    e.stopPropagation();
    if (token) {
      if (wishlist) {
        // 🟢 Nếu user đã login → gọi API để thêm vào wishlist
        const response = await productApi.addWishList({
          productId: productDetail?.id,
        });
        if (response.status === HttpCodeString.SUCCESS) {
          dispatch(dispatchAction("wishlist/addToWishlist", null));
        }
      } else {
        //Bỏ yêu thích
        const response = await productApi.removeWishList({
          productId: productDetail?.id ? [productDetail?.id] : null,
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
        updatedWishlist.push(productDetail?.id);
        dispatch(dispatchAction("wishlist/addToWishlist", null));
      } else {
        updatedWishlist = wishlist.filter(
          (id: number) => id !== productDetail?.id
        );
        dispatch(dispatchAction("wishlist/removeFromWishlist", null));
      }

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }

    setIsWishlisted(!isWishlisted);
  };

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    //call api getSizes
  };
  const handleChangeSize = (e: RadioChangeEvent) => {
    setSelectedSize(e.target.value);
    //call api getColors
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-10">
      {loading ? (
        <PageLoading />
      ) : (
        <>
          {notExistProduct ? (
            <div className="flex justify-center items-center font-semibold text-xl">
              Sản phẩm không tồn tại
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Gallery Images */}
                <div className="product-gallery">
        
                  <Gallery
                    items={
                      productDetail?.listImage?.map((e) => {
                        return {
                          original: e,
                          thumbnail: e,
                        } as ReactImageGalleryItem;
                      }) || []
                    }
                  />
                </div>

                {/* Product Information */}
                <div className="product-info">
                  <div className="border-b-[1px] border-gray-200 mb-6">
                    <h1 className="text-3xl mb-2 font-semibold">
                      {productDetail?.name}
                    </h1>
                    <div className="text-lg text-gray-500 mb-4">
                      {productDetail?.priceRegular ? (
                        <>
                          {productDetail?.priceSale ? (
                            <>
                              <div className="text-gray-500 line-through ml-2">
                                Giá Gốc :  {productDetail.priceRegular.toLocaleString()} VND
                              </div>
                              <span className="text-red-500 font-semibold ml-2">
                                Giảm :  {productDetail.priceSale.toLocaleString()} VND
                              </span>
                              {productDetail?.discount && (
                                <span className="text-green-500 font-semibold">
                                  (- {productDetail.discount}%)
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-red-500 font-semibold">
                              {productDetail.priceRegular.toLocaleString()} VND
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500">Giá không khả dụng</span>
                      )}
                    </div>
                    <Rate
                      value={productDetail?.rate}
                      allowHalf
                      disabled
                      className="mb-4"
                    />
                    <p className="text-gray-700 mt-6 mb-6">
                      {productDetail?.description}
                    </p>
                  </div>

                  {/* Color Selection */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Màu</h3>
                    <div className="color-area flex items-center gap-2">
                      {colors?.map((color) => {
                        const isWhite = color.toLowerCase() === "#ffffff" || color.toLowerCase() === "white";
                        return (
                          <div
                            className={`color w-6 h-6 shrink-0 cursor-pointer hover:opacity-75 rounded-[50%] ${color === selectedColor
                              ? "outline-2 outline-solid outline-neutral-400 border-[1px] border-solid border-white"
                              : ""
                              }`}
                            style={{
                              backgroundColor: color,
                              border: isWhite ? "1px solid #ccc" : "",
                              boxShadow: isWhite ? "0 0 2px 1px #ccc" : "",
                            }}
                            onClick={() => {
                              handleChangeColor(color);
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>


                  {/* Size Selection */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-3">Kích thước</h3>
                    <Radio.Group
                      value={selectedSize}
                      onChange={(e) => handleChangeSize(e)}
                      buttonStyle="solid"
                    >
                      {sizes?.map((sizeData) => (
                        <Radio.Button key={sizeData.size} value={sizeData.size}>
                          {sizeData.size}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </div>

                  {/* Quantity and Add to Cart */}
                  <QuantitySelector
                    style={{ width: 150 }}
                    min={0}
                    max={maxQuantity || 1}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <div className="flex items-center gap-2 mt-6 mb-6">
                    <button
                      className={`bg-red-500 border-none text-white px-3 py-2 rounded-[20px] font-semibold ${maxQuantity > 0 && quantity > 0
                        ? "hover:bg-amber-400 hover:text-black cursor-pointer"
                        : "cursor-not-allowed !bg-gray-300"
                        }`}
                      disabled={maxQuantity === 0 || quantity === 0}
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ
                    </button>
                    {maxQuantity === 0 && selectedColor && selectedSize && (
                      <div className="out-of-stock bg-black text-white h-10 flex justify-center items-center p-3">
                        Hết hàng
                      </div>
                    )}
                    <div
                      className="wish-list h-8 w-8 cursor-pointer hover:scale-110"
                      onClick={(e) => {
                        handleWishlist(e, !isWishlisted);
                      }}
                    >
                      {isWishlisted ? (
                        <Tooltip title="Bỏ yêu thích">
                          <img
                            className="w-full h-full"
                            src={icHeartFill}
                            alt=""
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Yêu thích">
                          <img
                            className="w-full h-full"
                            src={icHeartOutline}
                            alt=""
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-content my-6 py-6 border-y-[1px] border-y-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Mô tả</h2>
                <div
                  className="content-area"
                  dangerouslySetInnerHTML={{
                    __html: productDetail?.content || "",
                  }}
                ></div>
              </div>

              <Reviews />

              {/* Related Products or Recommendations */}
              <RelatedProducts product={productDetail} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
