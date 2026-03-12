export interface ApiResponse<T = any> {
    status: 'OK' | 'ERROR';
    message?: string;
    data?: T;
    error?: any;
}
