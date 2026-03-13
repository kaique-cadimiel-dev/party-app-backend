export interface UserRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

export interface ForgotPasswordRequest {
    email: string;
}
