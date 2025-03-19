export interface IProducts {
    id: number;
    name_product: string;
    price_regular: number;
    image: string;
    description: string;
    rating?: number;
    discount?: number;
    category?: string;
    images?: string[];
}
