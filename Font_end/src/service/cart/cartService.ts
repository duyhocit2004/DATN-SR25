import axios from "axios";


export const addToCart = async (productId: string, quantity: number) => {
  try {
    const response = await axios.post(`/products`, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
    throw error;
  }
};