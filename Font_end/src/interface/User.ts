export interface IUser {
    name: string;
    is_active: any;
    id: number;
    username: string;
    fullname: string;
    email: string;
    password: string;
    gender: string;
    phone: string;
    role: string; 
    user_image: File | null; 
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface AuthResponse {
    token: string;
}