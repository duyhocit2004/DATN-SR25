export interface IUser {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    role: string;
    email_verified_at: string | null;
    gender: string;
    user_image: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface AuthResponse {
    token: string;
}