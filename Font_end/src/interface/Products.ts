export interface IProducts {
    data: any;
    id?: string | number;
    categories_id: number;
    name_product: string;
    SKU: string;
    base_stock: number;
    price_regular: number;
    price_sale: number;
    description: string;
    views: number;
    content: string;
    image: string;
}
