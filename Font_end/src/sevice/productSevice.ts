import axiosInstance from '../axios/config';
import { IProducts } from '../interface/Products';

// export const getProducts = async (): Promise<IProducts[]> => {
//     const response = await axiosInstance.get<IProducts[]>('/products'); //thay theo API
//     return response.data;
// };
export const getProducts = async (): Promise<IProducts[]> => {
    const response = await axiosInstance.get('/products');
    return response.data.data; // Truy cập vào mảng bên trong `data`
};
