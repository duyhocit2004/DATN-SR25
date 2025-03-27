// import { Card } from "antd";
// import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IProduct } from "../../types/interface";

// interface ProductItemProps {
//   product: IProduct;
// }

// const ProductItem = ({ product }: ProductItemProps) => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const navigate = useNavigate();

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//   };
//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//   };

//   const goToDetail = () => {
//     navigate(`/product/${product.id}`);
//   };

//   const discountValue = parseFloat(product?.discount);
//   const discountedPrice = Math.round(product.price * (1 - discountValue / 100));

//   return (
//     <Card
//       hoverable
//       className="relative rounded-lg overflow-hidden group transition-all border-none shadow-lg"
//       bodyStyle={{ padding: 0 }}
//     >
//       {/* Wrapper chứa ảnh và badge giảm giá */}
//       <div className="relative cursor-pointer" onClick={goToDetail}>
//         {/* Badge giảm giá (luôn hiển thị trên ảnh) */}
//         {discountValue > 0 && (
//           <div className="absolute top-2 right-2 z-10">
//             <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//               -{product.discount}
//             </span>
//           </div>
//         )}

//         {/* Ảnh sản phẩm */}
//         <div className="overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </div>

//         {/* Actions */}
//         <div className="absolute bottom-0 left-0 right-0 flex h-[40px] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
//           <button
//             className={`cursor-pointer w-[40px] h-[40px] border-none text-white ${
//               isWishlisted ? "bg-red-500" : "bg-blue-800"
//             } hover:bg-gray-900 transition-all`}
//             onClick={handleWishlist}
//           >
//             <HeartOutlined className="text-xl" />
//           </button>
//           <button className="cursor-pointer flex-1 h-[40px] bg-blue-800 text-white border-l border-blue-400 hover:bg-gray-900 transition-all" onClick={handleAddToCart}>
//             <ShoppingCartOutlined className="text-xl" />
//           </button>
//         </div>
//       </div>

//       {/* Thông tin sản phẩm */}
//       <div className="p-4 text-center">
//         <h3
//           className="font-medium text-lg cursor-pointer transition-colors duration-300 hover:text-blue-500"
//           onClick={goToDetail}
//         >
//           {product.name}
//         </h3>
//         <div className="mt-2">
//           <span className="text-gray-400 line-through text-sm">{product.price.toLocaleString()} VND</span>
//           <span className="text-red-600 text-lg font-bold ml-2">{discountedPrice.toLocaleString()} VND</span>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default ProductItem;
const a = () => {};
export default a;
