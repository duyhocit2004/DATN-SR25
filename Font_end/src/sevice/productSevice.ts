import axiosInstance from '../axios/config';
import { IProducts } from '../interface/Products';

export const getProducts = async (): Promise<IProducts[]> => {
    const response = await axiosInstance.get<IProducts[]>('/products'); //thay theo API
    return response.data;
};


// import axiosInstance from '../axios/config';
// import { IProducts } from '../interface/Products';

// export const getProducts = async (): Promise<IProducts[]> => {
//     const response = await axiosInstance.get('/products'); // Lấy dữ liệu từ API
//     // Kiểm tra cấu trúc của response và trả về mảng sản phẩm
//     if (response.data && Array.isArray(response.data)) {
//         return response.data; // Nếu response.data là mảng, trả về mảng đó
//     } else if (response.data && Array.isArray(response.data.data)) {
//         return response.data.data; // Nếu response.data là đối tượng có thuộc tính 'data' là mảng, trả về mảng đó
//     } else {
//         throw new Error('Dữ liệu không phải là mảng sản phẩm');
//     }
// };