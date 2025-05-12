import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { dispatchAction } from '@/store/actionHelper';
import cartApi from '@/api/cartApi';
import productApi from '@/api/productApi';
import homeApi from '@/api/homeApi';
import { HttpCodeString } from '@/utils/constants';

interface HeaderCache {
  cartCount: number;
  wishlistCount: number;
  categories: any[];
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
let headerCache: HeaderCache | null = null;

export const useHeaderData = (token: string | null) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const fetchHeaderData = async () => {
    if (headerCache && Date.now() - headerCache.timestamp < CACHE_DURATION) {
      dispatch(dispatchAction("cart/setCartCount", headerCache.cartCount));
      dispatch(dispatchAction("wishlist/setWishlistCount", headerCache.wishlistCount));
      return;
    }

    try {
      setLoading(true);
      const [cartResponse, wishlistResponse, categoriesResponse] = await Promise.all([
        token ? cartApi.getCartByUserId() : Promise.resolve({ data: [] }),
        token ? productApi.getWishListByUserId() : Promise.resolve({ data: [] }),
        homeApi.getTreeCategories()
      ]);

      const cartCount = token 
        ? (cartResponse.status === HttpCodeString.SUCCESS ? cartResponse.data?.length : 0)
        : JSON.parse(localStorage.getItem("cart") || "[]").length;

      const wishlistCount = token
        ? (wishlistResponse.status === HttpCodeString.SUCCESS ? wishlistResponse.data?.length : 0)
        : 0;

      dispatch(dispatchAction("cart/setCartCount", cartCount));
      dispatch(dispatchAction("wishlist/setWishlistCount", wishlistCount));

      // Update cache
      headerCache = {
        cartCount,
        wishlistCount,
        categories: categoriesResponse.status === HttpCodeString.SUCCESS ? categoriesResponse.data : [],
        timestamp: Date.now()
      };
    } catch (error) {
      console.error("Error fetching header data:", error);
      dispatch(dispatchAction("cart/setCartCount", 0));
      dispatch(dispatchAction("wishlist/setWishlistCount", 0));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderData();
  }, [token]);

  return { loading };
}; 