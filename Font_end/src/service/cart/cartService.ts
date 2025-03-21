import { ICart } from "../../api/Cart";

const CART_KEY = "cart";

// Lấy giỏ hàng từ localStorage
export const GetCart = (): ICart[] => {
    const cart = localStorage.getItem(CART_KEY);
    try {
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error("Lỗi phân tích JSON giỏ hàng:", error);
        return [];
    }
};

// Lưu giỏ hàng vào localStorage
const SaveCart = (cart: ICart[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const AddToCart = (cartItem: ICart | null) => {
    if (!cartItem) {
        console.error("cartItem bị null hoặc undefined!");
        return;
    }

    if (!cartItem.id) {
        console.error("Sản phẩm không hợp lệ (id bị null)!", cartItem);
        return;
    }

    const cart = GetCart();
    
    // Kiểm tra giỏ hàng có dữ liệu không
    if (!Array.isArray(cart)) {
        console.error("Dữ liệu giỏ hàng không hợp lệ, reset lại!");
        localStorage.setItem("cart", JSON.stringify([]));
        return;
    }

    const existingItem = cart.find(
        item => item?.id === cartItem.id && item?.color === cartItem.color && item?.size === cartItem.size
    );

    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Giỏ hàng sau khi thêm:", cart);
};


// Cập nhật số lượng sản phẩm trong giỏ hàng
export const UpdateCartItem = (id: number, quantity: number) => {
    if (quantity < 1) {
        console.warn("Số lượng sản phẩm không hợp lệ:", quantity);
        return GetCart();
    }

    const cart = GetCart();
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        SaveCart(cart);
    }
    return cart;
};

// Xóa sản phẩm khỏi giỏ hàng
export const RemoveFromCart = (id: number) => {
    let cart = GetCart();
    cart = cart.filter(item => item.id !== id);
    SaveCart(cart);
    return cart;
};

// Xóa toàn bộ giỏ hàng
export const ClearCart = () => {
    localStorage.removeItem(CART_KEY);
};
