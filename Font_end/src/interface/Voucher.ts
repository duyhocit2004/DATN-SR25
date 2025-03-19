export interface IVoucher {
    expiration_date(expiration_date: any): unknown;
    usage_limit: boolean;
    used_count: any;
    is_active: any;
    id?: number;
    code: string;
    discount_type: 'percent' | 'fixed';
    discount_value: number;
    min_order_value?: number | null;
    max_discount?: number | null;
    quantity: number;
    used: number;
    user_id?: number | null;
    start_date?: string | null;
    end_date?: string | null;
    status: 'active' | 'expired' | 'used_up' | 'disabled';
    created_at?: string | null;
    updated_at?: string | null;
}
