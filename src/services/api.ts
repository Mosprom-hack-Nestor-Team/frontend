/**
 * API Service for authentication and user management
 */

const API_BASE_URL = 'http://localhost:7878/api/v1';

export interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export interface TokenData {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface AuthResponse {
    user: UserData;
    token: TokenData;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

class ApiService {
    private getAuthHeader(): HeadersInit {
        const token = localStorage.getItem('access_token');
        return {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        };
    }

    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }

        const result: AuthResponse = await response.json();

        // Save tokens to localStorage
        localStorage.setItem('access_token', result.token.access_token);
        localStorage.setItem('refresh_token', result.token.refresh_token);
        localStorage.setItem('user', JSON.stringify(result.user));

        return result;
    }

    /**
     * Login user
     */
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }

        const result: AuthResponse = await response.json();

        // Save tokens to localStorage
        localStorage.setItem('access_token', result.token.access_token);
        localStorage.setItem('refresh_token', result.token.refresh_token);
        localStorage.setItem('user', JSON.stringify(result.user));

        return result;
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
            try {
                await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh_token: refreshToken }),
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }

        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    }

    /**
     * Get current user info
     */
    async getCurrentUser(): Promise<UserData> {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: this.getAuthHeader(),
        });

        if (!response.ok) {
            throw new Error('Failed to get user info');
        }

        return await response.json();
    }

    /**
     * Refresh access token
     */
    async refreshToken(): Promise<TokenData> {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const result: TokenData = await response.json();

        // Update tokens
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);

        return result;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }

    /**
     * Get stored user data
     */
    getStoredUser(): UserData | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
}

export const apiService = new ApiService();
