export interface AuthResponse{
    access_token ?:string;
    expires_in ?: number | string;
    not_before_policy ?: number | string;
    refresh_expires_in ?: number | string;
    refresh_token ?: string;
    scope ?: string,
    session_state ?: string;
    token_type ?: string,
        
}