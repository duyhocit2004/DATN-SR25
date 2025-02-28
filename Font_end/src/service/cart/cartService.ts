import { ICart } from "../../interface/Cart";

const CART_KEY = "cart";

// Lấy giỏ hàng từ localStorage
export const GetCart = (): ICart[] => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

// Lưu giỏ hàng vào localStorage
const SaveCart = (cart: ICart[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const AddToCart = (cartItem: ICart) => {
  const cart = GetCart();
  const existingItem = cart.find(
      item => item.id === cartItem.id && item.color === cartItem.color && item.size === cartItem.size
  );

  if (existingItem) {
      existingItem.quantity += cartItem.quantity;
  } else {
      cart.push(cartItem);
  }

  SaveCart(cart);
  return cart;
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const UpdateCartItem = (id: number, quantity: number) => {
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
