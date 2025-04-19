import { Card, Button, Input } from "antd";
import { useEffect, useState } from "react";
import imgSupport1 from "../../../../public/images/home/support-1.png";
import imgSupport2 from "../../../../public/images/home/support-2.png";
import imgSupport3 from "../../../../public/images/home/support-3.png";
import imgSupport4 from "../../../../public/images/home/support-4.png";
import imgBlog from "../../../../public/images/blog/home/post-1.jpg";
import imgBrand from "../../../../public/images/brands/brand1.png";
import ProductItem from "@/client/components/ProductItem";
import {
  IAllBanner,
  IBanner,
  IListCategory,
  IProduct,
} from "@/types/interface";
import CarouselCustom from "@/components/carousel";
import homeApi from "@/api/homeApi";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import "./index.scss";


const brands = [imgBrand, imgBrand, imgBrand, imgBrand];

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<IListCategory[]>([]);
  const [banners, setBanners] = useState<IAllBanner | null>(null);
  const [topDiscountedProducts, setTopDiscountedProducts] = useState<
    IProduct[]
  >([]);
  const [topNewestProducts, setTopNewestProducts] = useState<IProduct[]>([]);
  const [topBestSellingProducts, setTopBestSellingProducts] = useState<
    IProduct[]
  >([]);



  useEffect(() => {
    getAllCategories();
    getAllBanners();
    getTopDiscountedProducts();
    getTopNewestProducts();
    getTopBestSellingProducts();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await homeApi.getAllCategories();
      if (response?.status === HttpCodeString.SUCCESS) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    }
  };
  const getAllBanners = async () => {
    try {
      const response = await homeApi.getAllBanners();
      if (response?.status === HttpCodeString.SUCCESS) {
        setBanners(response.data as IAllBanner);
      } else {
        setBanners(null);
      }
    } catch {
      setBanners(null);
    }
  };
  const getTopDiscountedProducts = async () => {
    try {
      const payload = { topNumber: 8 };
      const response = await productApi.getTopDiscountedProducts(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        const sortedProducts = response.data
          .sort((a, b) => Number(b.discount) - Number(a.discount))
          .slice(0, 8);
        console.log("Dữ liệu sau khi sắp xếp:", sortedProducts);
        setTopDiscountedProducts(response.data);
      } else {
        setTopDiscountedProducts([]);
      }
    } catch {
      setTopDiscountedProducts([]);
    }
  };
  const getTopNewestProducts = async () => {
    try {
      const response = await productApi.getTopNewestProducts();
      if (response?.status === HttpCodeString.SUCCESS) {
        setTopNewestProducts(response.data);
      } else {
        setTopNewestProducts([]);
      }
    } catch {
      setTopNewestProducts([]);
    }
  };
  const getTopBestSellingProducts = async () => {
    try {
      const response = await productApi.getTopBestSellingProducts();
      if (response?.status === HttpCodeString.SUCCESS) {
        setTopBestSellingProducts(response.data);
      } else {
        setTopBestSellingProducts([]);
      }
    } catch {
      setTopBestSellingProducts([]);
    }
  };

  const handleViewProductByCategory = (catId: number) => {
    navigate("/products?categoryId=" + catId);
  };

  return (
    <div className="space-y-12">
      {/* Banner (Slider) */}
      <CarouselCustom
        className="main-slide h-[500px]"
        autoplay
        autoplaySpeed={3000}
      >
        {banners?.main?.map((e: IBanner, index: number) => {
          const productLink = e.productId ? `/products/${e.productId}` : "#";

          return (
            <div
              key={e.id}
              className="h-[500px] bg-cover bg-center !flex justify-center"
            >
              <a href={productLink}>
                <img
                  className="h-full bg-cover bg-center cursor-pointer"
                  src={e.image}
                  alt={"banner " + (index + 1)}
                />
              </a>
            </div>
          );
        })}
      </CarouselCustom>
 


      <section className="container mx-auto px-4 mt-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
          <div className="relative group flex justify-center gap-3">
            <div className="icon flex items-center justify-center">
              <img
                className="animate-pulse"
                src={imgSupport1}
                alt={"support"}
              />
            </div>
            <div className="content">
              <div className="title font-semibold text-xl">Miễn Phí Vận Chuyển</div>
              <div className="description">Miễn Phí Tất Cả Đơn Hàng </div>
            </div>
          </div>
          <div className="relative group flex justify-center gap-3">
            <div className="icon flex items-center justify-center">
              <img
                className="animate-pulse"
                src={imgSupport2}
                alt={"support"}
              />
            </div>
            <div className="content">
              <div className="title font-semibold text-xl">Hỗ Trợ 24/7</div>
              <div className="description">Hỗ Trợ Toàn Thời Gian </div>
            </div>
          </div>
          <div className="relative group flex justify-center gap-3">
            <div className="icon flex items-center justify-center">
              <img
                className="animate-pulse"
                src={imgSupport3}
                alt={"support"}
              />
            </div>
            <div className="content">
              <div className="title font-semibold text-xl">Hoàn Tiền</div>
              <div className="description">Hỗ Trợ Hoàn Tiền </div>
            </div>
          </div>
          <div className="relative group flex justify-center gap-3">
            <div className="icon flex items-center justify-center">
              <img
                className="animate-pulse"
                src={imgSupport4}
                alt={"support"}
              />
            </div>
            <div className="content">
              <div className="title font-semibold text-xl">Giảm Giá Đơn Hàng </div>
              <div className="description">Ưu Đãi - Hấp Dẫn </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 mt-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-${banners?.advertisement?.length || 2
            } lg:grid-cols-${banners?.advertisement?.length || 4} gap-6`}
        >
          {banners?.advertisement?.map((adv: IBanner, index: number) => (
            <div key={adv.id} className="relative group p-2">
              <img
                src={adv.image}
                alt={"advertisement " + (index + 1)}
                className=" h-[150px] object-cover rounded-lg mx-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Danh Mục Sản Phẩm
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleViewProductByCategory(cat.id)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="category-item"
              />
              <span className="mt-2 text-lg font-semibold">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sản Phẩm Bán Chạy
        </h2>
        {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {featuredProducts.map((product) => (
            <ProductItem product={product} />
          ))}
        </div> */}
        <CarouselCustom
          autoplay
          autoplaySpeed={3000}
          arrows
          dots={false} // Tắt dots nếu không cần
          infinite
          slidesToShow={4} // Số lượng item hiển thị cùng lúc
          slidesToScroll={1} // Mỗi lần cuộn sẽ cuộn 1 item
          responsive={[
            {
              breakpoint: 1024, // Với màn hình nhỏ hơn 1024px
              settings: {
                slidesToShow: 3, // Hiển thị 3 item
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 600, // Với màn hình nhỏ hơn 600px
              settings: {
                slidesToShow: 2, // Hiển thị 2 item
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480, // Với màn hình nhỏ hơn 480px
              settings: {
                slidesToShow: 1, // Hiển thị 1 item
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {topBestSellingProducts.map((product) => (
            <div key={product.id} className="my-2">
              <ProductItem product={product} />
            </div>
          ))}
        </CarouselCustom>
        <div className="view-more w-full flex justify-center items-center mt-5">
          <Button
            type="primary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Xem thêm
          </Button>
        </div>
      </section>
      {/* Newest Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Sản Phẩm Mới</h2>
        <CarouselCustom
          autoplay
          autoplaySpeed={3000}
          arrows
          dots={false} // Tắt dots nếu không cần
          infinite
          slidesToShow={4} // Số lượng item hiển thị cùng lúc
          slidesToScroll={1} // Mỗi lần cuộn sẽ cuộn 1 item
          responsive={[
            {
              breakpoint: 1024, // Với màn hình nhỏ hơn 1024px
              settings: {
                slidesToShow: 3, // Hiển thị 3 item
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 600, // Với màn hình nhỏ hơn 600px
              settings: {
                slidesToShow: 2, // Hiển thị 2 item
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 480, // Với màn hình nhỏ hơn 480px
              settings: {
                slidesToShow: 1, // Hiển thị 1 item
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {topNewestProducts.map((product) => (
            <div key={product.id} className="my-2">
              <ProductItem product={product} />
            </div>
          ))}
        </CarouselCustom>
        <div className="view-more w-full flex justify-center items-center mt-5">
          <Button
            type="primary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Xem thêm
          </Button>
        </div>
      </section>

      {/* Discounted Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sản Phẩm Giảm Giá
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topDiscountedProducts.map((product) => (
            <ProductItem product={product} />
          ))}
        </div>
        <div className="view-more w-full flex justify-center items-center mt-5">
          <Button
            type="primary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Xem thêm
          </Button>
        </div>
      </section>

      {/* Blog Section */}
      {/* <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Blog Mới Nhất</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.title}
              cover={
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-[200px] object-cover"
                />
              }
            >
              <h3 className="font-medium">{blog.title}</h3>
              <p className="text-gray-500">{blog.date}</p>
              <Button type="link">Đọc thêm</Button>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Brand Logos */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Thương Hiệu Đối Tác</h2>
        <div className="flex justify-center gap-6">
          {brands.map((brand, index) => (
            <img key={index} src={brand} alt="Brand" className="h-[50px]" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
