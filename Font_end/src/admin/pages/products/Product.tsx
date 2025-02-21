/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProducts } from "../../../interface/Products";
import { DeleteProduct, ListProduct, UpdateProduct } from "../../../service/products/productService";
import ProductList from "./ProductList";


const Products: React.FC = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        fetchProducts()
    },[])

    // Hàm fetch dữ liệu
    const fetchProducts = async () => {
        try {
            const data = await ListProduct();
            console.log("✅ Dữ liệu sản phẩm nhận được:", data);
            setProducts(Array.isArray(data) ? data : []);
        } catch (error: any) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    // Hàm cập nhật sản phẩm
    const updateProducts = async (
        id: number | string,
        updateProduct: IProducts
    ): Promise<void> => {
        try {
            const data = await UpdateProduct(id, updateProduct);
            if (data?.products) {
                setProducts(data.products);
            }
            await fetchProducts();
            alert("Cập nhật sản phẩm thành công");
        } catch (error: any) {
            alert("Cập nhật sản phẩm thất bại!");
            console.error("Update Product Error:", error?.message || error);
        }
    };

    // Hàm xóa sản phẩm
    const deleteProducts = async (id: number | string) => {
        try {
            const confirmDelete = window.confirm(
                "Bạn có chắc chắn muốn xóa sản phẩm này?"
            );
            if (!confirmDelete) return;

            await DeleteProduct(id);
            alert("Xóa sản phẩm thành công!");
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Xóa sản phẩm thất bại!");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="dashboards">
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">Danh Sách Sản Phẩm</h1>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group me-2">
                                            <NavLink to={`/admin/products/add-product`}>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    Thêm Sản Phẩm
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {loading && <p>Đang tải dữ liệu...</p>}
                                {error && <p>Lỗi: {error}</p>}
                                {!loading && !error && (
                                    <ProductList
                                        products={products}
                                        loading={loading}
                                        error={error}
                                        updateProduct={updateProducts}
                                        deleteProduct={deleteProducts}
                                    />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
