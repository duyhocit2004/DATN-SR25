import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  Pagination,
  Slider,
  Row,
  Col,
  Collapse,
  Input,
  Spin,
  Tree,
  TreeProps,
  Button,
} from "antd";
import { IListCategory, IPagination, IProduct } from "@/types/interface";
import ProductItem from "@/client/components/ProductItem";
import { HttpCodeString } from "@/utils/constants";
import { cloneDeep } from "lodash";
import FilterProduct, { IFilterData } from "../components/FilterProduct";
import { useSearchParams } from "react-router-dom";
import productApi from "@/api/productApi";
import homeApi from "@/api/homeApi";

const { Panel } = Collapse;
const { Option } = Select;
const { Search } = Input;

interface IPayloadSeach {
  pageNum: number;
  pageSize: number;
  name: string;
  categoriesId: string;
  fromPrice: string;
  toPrice: string;
  sortType: string | null;
}
const paginationDefault = {
  page: 0,
  size: 9,
};
// Thêm CSS inline hoặc trong file CSS riêng
const filterPanelStyle: React.CSSProperties = {
  position: "sticky",
  top: "10px", 
  maxHeight: "calc(100vh - 40px)", 
  overflowY: "auto", 
  background: "white",
  borderRadius: "50px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  paddingBottom: "16px",
};
const sortDefault = "default";
const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isFirstRender = useRef(true);
  const debounceCompleted = useRef({
    price: false,
    sort: false,
    category: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTreeCategories, setLoadingTreeCategories] = useState<boolean>(true);
  const [pagination, setPagination] = useState<IPagination>(cloneDeep(paginationDefault));

  const [categoriesForFilter, setCategoriesForFilter] = useState<IListCategory[]>([]);
  const [categories, setCategories] = useState<IListCategory[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>([]);

  const [sortOption, setSortOption] = useState<string>(sortDefault);
  const [debounceSortOption, setDebounceSortOption] = useState<string>(sortDefault);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [debounceSelectedCategories, setDebounceSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [debouncePriceRange, setDebouncePriceRange] = useState<[number, number]>([0, 1000000]);
  const [searchTerm, setSearchTerm] = useState<string>("");




  // Lấy danh mục sản phẩm , thiết lập trạng thái ban đầu 
  useEffect(() => {
    setCategoryId(
      searchParams.get("categoryId")
        ? Number(searchParams.get("categoryId"))
        : null
    );
  }, [searchParams]);


  // Nếu có categoryId trong URL, nó sẽ được sử dụng để lọc danh mục
  useEffect(() => {
    setSelectedCategories(categoryId ? [categoryId?.toString()] : []);
    const treeCategories = findCategoryDFS(cloneDeep(categories), categoryId);
    setCategoriesForFilter(treeCategories || []);
  }, [categoryId, categories]);

  // Gọi API để lấy danh sách danh mục 
  useEffect(() => {
    getTreeCategories();
  }, []);

  // Lọc sản phẩm theo danh mục, giá và tìm kiếm
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceSelectedCategories(selectedCategories);
      debounceCompleted.current.category = true;
    }, 1000); // Delay 1 giây

    return () => clearTimeout(timeoutId);
  }, [selectedCategories]);
  // Sắp xếp
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceSortOption(sortOption);
      debounceCompleted.current.sort = true;
    }, 1000); // Delay 1 giây

    return () => clearTimeout(timeoutId);
  }, [sortOption]);
  // Giá 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncePriceRange(priceRange);
      debounceCompleted.current.price = true;
    }, 1000); // Delay 1 giây

    return () => clearTimeout(timeoutId);
  }, [priceRange]);



  // Gọi fetchProducts khi tất cả debounce hoàn tất
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Đánh dấu lần đầu đã qua
      return;
    }
    // Kiểm tra xem cả 3 state debounce đã hoàn thành chưa
    if (
      debounceCompleted.current.category &&
      debounceCompleted.current.price &&
      debounceCompleted.current.sort
    ) {
      setPagination(cloneDeep(paginationDefault));
      const payload: IPayloadSeach = {
        pageNum: paginationDefault?.page,
        pageSize: paginationDefault?.size,
        name: searchTerm,
        categoriesId:
          debounceSelectedCategories?.length > 0
            ? debounceSelectedCategories[debounceSelectedCategories?.length - 1]
            : "",
        fromPrice: debouncePriceRange?.[0]
          ? debouncePriceRange?.[0].toString()
          : "",
        toPrice: debouncePriceRange?.[1]
          ? debouncePriceRange?.[1].toString()
          : "",
        sortType:
          debounceSortOption === sortDefault ? null : debounceSortOption,
      };
      fetchProducts(payload);
    }
  }, [debouncePriceRange, debounceSelectedCategories, debounceSortOption]);




  // Hàm gọi API DS sản phẩm 
  const fetchProducts = async (filterData: IPayloadSeach) => {
    //Tránh TH có category mà logic xử lý debounceSelectedCategories chưa hoàn tất sẽ không call api nữa
    if (
      searchParams.get("categoryId") &&
      debounceSelectedCategories?.length === 0
    )
      return;
    try {
      setLoading(true);
      const result = await productApi.getProductsByFilter(filterData);
      if (result?.status === HttpCodeString.SUCCESS) {
        setProducts(result?.data?.data);
        setTotalProducts(result?.data?.total);
      } else {
        setProducts([]);
        setTotalProducts(0);
      }
    } catch {
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };


  // Lấy danh mục theo dạng cây 
  const getTreeCategories = async () => {
    try {
      setLoadingTreeCategories(true);
      const result = await homeApi.getAllCategories();
      if (result?.status === HttpCodeString.SUCCESS) {
        setCategories(result?.data);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    } finally {
      setLoadingTreeCategories(false);
    }
  };


  // Hàm reset bộ lọc
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setDebounceSelectedCategories([]);
    setPriceRange([0, 1000000]);
    setDebouncePriceRange([0, 1000000]);
    setSortOption(sortDefault);
    setDebounceSortOption(sortDefault);
    setPagination(cloneDeep(paginationDefault));
    setCategoryId(null); // Reset categoryId nếu cần

    // Gọi API để lấy tất cả sản phẩm
    const payload: IPayloadSeach = {
      pageNum: paginationDefault.page,
      pageSize: paginationDefault.size,
      name: "",
      categoriesId: "",
      fromPrice: "",
      toPrice: "",
      sortType: null,
    };
    fetchProducts(payload);
  };

  // Đệ quy DFS
  const findCategoryDFS = (treeArray: IListCategory[], catId: number | null): IListCategory[] | null => {
    if (!catId && catId !== 0)
      return treeArray;

    for (const node of treeArray) {
      // Thêm thuộc tính hasChildren nếu node có con
      if (node.children && node.children.length > 0) {
        node.hasChildren = true;
      }

      if (node.id === catId)
        return [{ ...node }]; // Trả về node đã cập nhật

      if (node.children) {
        const found = findCategoryDFS(node.children, catId);
        if (found) {
          return found;
        }
      }
    }
    return null; // Không tìm thấy
  };




  // Tìm theo tên 
  const onSearchKeyWord = (value: string) => {
    //Tránh TH có category mà logic xử lý debounceSelectedCategories chưa hoàn tất sẽ không call api nữa
    if (
      searchParams.get("categoryId") &&
      debounceSelectedCategories?.length === 0
    )
      return;
    setSearchTerm(value);
    setPagination(cloneDeep(paginationDefault));
    const payload: IPayloadSeach = {
      pageNum: paginationDefault?.page,
      pageSize: paginationDefault?.size,
      name: value,
      categoriesId:
        debounceSelectedCategories?.length > 0
          ? debounceSelectedCategories[debounceSelectedCategories?.length - 1]
          : "",
      fromPrice: debouncePriceRange?.[0]
        ? debouncePriceRange?.[0].toString()
        : "",
      toPrice: debouncePriceRange?.[1]
        ? debouncePriceRange?.[1].toString()
        : "",
      sortType: sortOption === sortDefault ? null : sortOption,
    };
    fetchProducts(payload);
  };


  // chuyển trang 
  const onChangePagination = (pageNumber: number, pageSize: number) => {
    setPagination({
      page: pageNumber,
      size: pageSize,
    });
    const payload: IPayloadSeach = {
      pageNum: pageNumber,
      pageSize: pageSize,
      name: searchTerm,
      categoriesId:
        debounceSelectedCategories?.length > 0
          ? debounceSelectedCategories[debounceSelectedCategories?.length - 1]
          : "",
      fromPrice: debouncePriceRange?.[0]
        ? debouncePriceRange?.[0].toString()
        : "",
      toPrice: debouncePriceRange?.[1]
        ? debouncePriceRange?.[1].toString()
        : "",
      sortType: sortOption === sortDefault ? null : sortOption,
    };
    fetchProducts(payload);
  };


  // Lọc sản phẩm (trên mobile hoặc qua component FilterProduct)
  const handleFilterProduct = (filterData: IFilterData) => {
    setPagination(cloneDeep(paginationDefault));
    const payload: IPayloadSeach = {
      pageNum: paginationDefault.page,
      pageSize: paginationDefault.size,
      name: searchTerm,
      categoriesId:
        filterData?.selectedCategories?.length > 0
          ? filterData?.selectedCategories[
          filterData?.selectedCategories?.length - 1
          ]
          : "",
      fromPrice: filterData?.priceRange?.[0]
        ? filterData?.priceRange?.[0].toString()
        : "",
      toPrice: filterData?.priceRange?.[1]
        ? filterData?.priceRange?.[1].toString()
        : "",
      sortType: sortOption === sortDefault ? null : sortOption,
    };
    fetchProducts(payload);
  };


  // chọn danh mục trong cây 
  const onSelect: TreeProps["onSelect"] = (selectedKeysValue) => {
    const newSelectedKeys = selectedKeysValue.map((num) => num.toString());
    if (categoryId) {
      const newCat = [categoryId.toString()].concat(newSelectedKeys);
      setSelectedCategories(newCat);
    } else {
      setSelectedCategories(newSelectedKeys);
    }
  };



  return (
    <div className="container mx-auto px-4 pt-10 md:pt-20">
      <Row gutter={[32, 16]}>
        {/* Cột Filter cho màn hình lớn */}
        <Col span={0} md={8} lg={6}>
        <div style={filterPanelStyle}>
          <div className=" bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold mb-4 p-4">Bộ lọc</h3>
            <Button type="text" onClick={resetFilters}>
              Tất cả sản phẩm
            </Button>
            <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
              {/* Thanh tìm kiếm */}
              <Panel header="Tìm kiếm" key="1">
                <Search
                  placeholder="Tìm kiếm sản phẩm..."
                  allowClear
                  // enterButton="Tìm"
                  // size="large"
                  onSearch={(value) => onSearchKeyWord(value)}
                />
              </Panel>

              {((!categoryId && categoriesForFilter?.length > 0) ||
                (categoryId &&
                  (categoriesForFilter?.length > 1 ||
                    (categoriesForFilter?.length === 1 &&
                      categoriesForFilter[0]?.hasChildren)))) && (
                  <Panel className="relative" header="Danh mục" key="2">
                    {loadingTreeCategories && (
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
                    <Tree
                      // checkable
                      fieldNames={{
                        key: "id",
                        title: "name",
                        children: "children",
                      }}
                      treeData={
                        categoryId
                          ? categoriesForFilter[0]?.children
                          : categoriesForFilter
                      }
                      onSelect={onSelect}
                    />
                  </Panel>
                )}

              {/* Filter theo giá */}
              <Panel header="Khoảng giá" key="3">
                <Slider
                  range
                  min={0}
                  max={1000000}
                  step={100000}
                  defaultValue={priceRange}
                  onChange={(values) =>
                    setPriceRange(values as [number, number])
                  }
                />
                <p>
                  {priceRange[0].toLocaleString()} VND -{" "}
                  {priceRange[1].toLocaleString()} VND
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
        </Col>
        {/* Cột Filter cho màn hình nhỏ */}
        <Col span={24} md={0}>
          <div className="flex justify-between items-center mb-4">
            {/* Ô tìm kiếm */}
            <Search
              placeholder="Tìm kiếm sản phẩm..."
              allowClear
              value={searchTerm}
              onSearch={(value) => onSearchKeyWord(value)}
              className="w-3/4"
            />

            {/* Icon Filter */}
            <FilterProduct
              categories={categoriesForFilter}
              categoryId={categoryId}
              onFilter={handleFilterProduct}
            />
          </div>
        </Col>
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
        {/* Cột danh sách sản phẩm */}
        <Col span={24} md={16} lg={18}>
          {/* Thanh Sort */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-6">
              <h3 className="text-lg font-semibold">Danh sách sản phẩm</h3>
              <div className="total-product text-gray-600">
                {totalProducts} sản phẩm
              </div>
            </div>
            <Select
              value={sortOption}
              onChange={setSortOption}
              className="w-48"
            >
              <Option value="default">Mặc định</Option>
              <Option value="asc">Giá thấp → cao</Option>
              <Option value="desc">Giá cao → thấp</Option>
            </Select>
          </div>

          {/* Grid sản phẩm */}
          <Row gutter={[16, 16]}>
            {products.length > 0 ? (
              products?.map((product) => (
                <Col key={product.id} span={24} sm={12} md={12} lg={8} xl={8}>
                  <ProductItem product={product} />
                </Col>
              ))
            ) : (
              <p className="text-center w-full text-gray-500">
                Không tìm thấy sản phẩm nào.
              </p>
            )}
          </Row>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              defaultCurrent={1}
              current={pagination?.page}
              total={totalProducts}
              pageSize={pagination?.size}
              onChange={onChangePagination}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
