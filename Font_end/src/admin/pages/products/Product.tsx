/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProducts } from "../../../interface/Products";
import { DeleteProduct, ListProduct, UpdateProduct } from "../../../service/products/productService";
import ProductList from "./ProductList";
import { Layout, Button, Space, Typography, message, Spin, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;


const Products: React.FC = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


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
        <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={2}>Danh Sách Sản Phẩm</Title>
                    <NavLink to={`/admin/products/add-product`}>
                        <Button type="primary" icon={<PlusOutlined />}>Thêm Sản Phẩm</Button>
                    </NavLink>
                </div>
                {loading ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <Typography.Text type="danger">Lỗi: {error}</Typography.Text>
                ) : (
                    <ProductList 
                        products={products} 
                        loading={loading} 
                        error={error} 
                        updateProduct={updateProducts} 
                        deleteProduct={deleteProducts} 
                    />
                )}
        </>
                
    );
};

export default Products;
