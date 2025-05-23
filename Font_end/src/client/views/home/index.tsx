import { Card, Button, Input } from "antd";
import { useEffect, useState } from "react";
import imgSupport1 from "../../../../public/images/home/support-1.png";
import imgSupport2 from "../../../../public/images/home/support-2.png";
import imgSupport3 from "../../../../public/images/home/support-3.png";
import imgSupport4 from "../../../../public/images/home/support-4.png";
import imgBlog from "../../../../public/images/blog/home/post-1.jpg";
import imgBrand1 from "../../../../public/images/brands/brand1.png";
import imgBrand2 from "../../../../public/images/brands/brand2.png";
import imgBrand3 from "../../../../public/images/brands/brand3.png";
import imgBrand4 from "../../../../public/images/brands/brand4.png";
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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchCategories } from "@/store/reducers/adminProductSlice";


const brands = [imgBrand1, imgBrand2, imgBrand3, imgBrand4];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.adminProduct.categories);
  const [banners, setBanners] = useState<IAllBanner | null>(null);
  const [topDiscountedProducts, setTopDiscountedProducts] = useState<IProduct[]>([]);
  const [topNewestProducts, setTopNewestProducts] = useState<IProduct[]>([]);
  const [topBestSellingProducts, setTopBestSellingProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Cache FE 2 phút
        const cacheKey = 'home_summary_cache';
        const cacheStr = localStorage.getItem(cacheKey);
        let cache: any = null;
        if (cacheStr) {
          try {
            cache = JSON.parse(cacheStr);
          } catch {}
        }
        if (cache && cache.timestamp && Date.now() - cache.timestamp < 2 * 60 * 1000) {
          setBanners(cache.data.banners);
          setTopDiscountedProducts(cache.data.topDiscountedProducts);
          setTopNewestProducts(cache.data.topNewestProducts);
          setTopBestSellingProducts(cache.data.topBestSellingProducts);
          setLoading(false);
          return;
        }
        const data = await homeApi.getHomeSummary(8);
        setBanners(data.banners);
        setTopDiscountedProducts(data.topDiscountedProducts);
        setTopNewestProducts(data.topNewestProducts);
        setTopBestSellingProducts(data.topBestSellingProducts);
        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleViewProductByCategory = (catId: number) => {
    navigate("/products?categoryId=" + catId);
  };

  return (
    <div className="space-y-12">
      {/* Banner (Slider) */}
      <CarouselCustom
        className="main-slide"
        autoplay
        autoplaySpeed={3000}
      >
        {banners?.main?.map((e: IBanner, index: number) => {
          const productLink = e.productId ? `/products/${e.productId}` : "#";

          return (
            <div
              key={e.id}
              className="banner-wrapper"
            >
              <a href={productLink} className="banner-link">
                <img
                  className="banner-image"
                  src={e.image}
                  alt={"banner " + (index + 1)}
                />
              </a>
            </div>
          );
        })}
      </CarouselCustom>

      <style jsx>{`
        .banner-wrapper {
          position: relative;
          overflow: hidden;
          width: 100vw;
          height: 70vh;
          min-height: 350px;
          max-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .banner-link {
          display: block;
          width: 100%;
          height: 100%;
        }

        .banner-image {
          width: 100vw;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .banner-wrapper:hover .banner-image {
          transform: scale(1.05);
        }

        .main-slide {
          width: 100vw;
          height: 70vh;
          min-height: 350px;
          max-height: 100vh;
          position: relative;
        }

        .main-slide :global(.slick-slide) {
          transition: all 0.5s ease;
        }

        .main-slide :global(.slick-active) {
          z-index: 1;
        }

        .main-slide :global(.slick-prev),
        .main-slide :global(.slick-next) {
          z-index: 2;
          transition: all 0.3s ease;
        }

        .main-slide :global(.slick-prev:hover),
        .main-slide :global(.slick-next:hover) {
          transform: scale(1.1);
        }
      `}</style>

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
