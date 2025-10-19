/**
 * API Service for authentication and user management
 */

const API_BASE_URL =
    (import.meta.env?.VITE_API_BASE_URL as string) ||
    'http://localhost:7878/api/v1';

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

// Spreadsheet interfaces
export interface CellData {
    value: any;
    value_type: 'text' | 'number' | 'formula' | 'date' | 'boolean';
    formula?: string;
    style?: Record<string, any>;
}

export interface CellUpdate {
    row: number;
    col: number;
    value: any;
    value_type: 'text' | 'number' | 'formula' | 'date' | 'boolean';
    formula?: string;
    style?: Record<string, any>;
}

export interface PermissionInfo {
    user_email: string;
    permission_level: 'owner' | 'edit' | 'view';
    granted_at: string;
    granted_by: number;
}

export interface SpreadsheetInfo {
    id: string;
    title: string;
    owner_id: number;
    owner_email: string;
    rows: number;
    cols: number;
    created_at: string;
    updated_at: string;
    version: number;
    my_permission: 'owner' | 'edit' | 'view';
    last_modified_email?: string | null;
}

export interface SpreadsheetDetail extends SpreadsheetInfo {
    cells: Record<string, CellData>;
    permissions: PermissionInfo[];
}

export interface SpreadsheetCreate {
    title: string;
    rows?: number;
    cols?: number;
}

export interface ShareSpreadsheet {
    user_email: string;
    permission_level: 'edit' | 'view';
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

    // Spreadsheet API methods

    /**
     * Get all spreadsheets for current user
     */
    async getSpreadsheets(): Promise<SpreadsheetInfo[]> {
        const response = await fetch(`${API_BASE_URL}/spreadsheets/`, {
            method: 'GET',
            headers: this.getAuthHeader(),
        });

        if (!response.ok) {
            throw new Error('Failed to get spreadsheets');
        }

        const result = await response.json();
        return result.spreadsheets;
    }

    /**
     * Get spreadsheet details
     */
    async getSpreadsheet(id: string): Promise<SpreadsheetDetail> {
        const response = await fetch(`${API_BASE_URL}/spreadsheets/${id}`, {
            method: 'GET',
            headers: this.getAuthHeader(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to get spreadsheet');
        }

        return await response.json();
    }

    /**
     * Create new spreadsheet
     */
    async createSpreadsheet(data: SpreadsheetCreate): Promise<SpreadsheetInfo> {
        const response = await fetch(`${API_BASE_URL}/spreadsheets/`, {
            method: 'POST',
            headers: this.getAuthHeader(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create spreadsheet');
        }

        return await response.json();
    }

    /**
     * Update spreadsheet metadata
     */
    async updateSpreadsheet(id: string, data: { title: string }): Promise<SpreadsheetInfo> {
        const response = await fetch(`${API_BASE_URL}/spreadsheets/${id}`, {
            method: 'PATCH',
            headers: this.getAuthHeader(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update spreadsheet');
        }

        return await response.json();
    }

    /**
     * Delete spreadsheet
     */
    async deleteSpreadsheet(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/spreadsheets/${id}`, {
            method: 'DELETE',
            headers: this.getAuthHeader(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete spreadsheet');
        }
    }

    /**
     * Update a cell in spreadsheet
     */
    async updateCell(spreadsheetId: string, cellUpdate: CellUpdate): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/spreadsheets/${spreadsheetId}/cells`, {
            method: 'PATCH',
            headers: this.getAuthHeader(),
            body: JSON.stringify(cellUpdate),
        });

        if (!response.ok) {
            throw new Error('Failed to update cell');
        }

        return await response.json();
    }

    /**
     * Share spreadsheet with another user
     */
    async shareSpreadsheet(spreadsheetId: string, data: ShareSpreadsheet): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/spreadsheets/${spreadsheetId}/share`, {
            method: 'POST',
            headers: this.getAuthHeader(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to share spreadsheet');
        }
    }

    /**
     * Remove user access to spreadsheet
     */
    async removePermission(spreadsheetId: string, userEmail: string): Promise<void> {
        const response = await fetch(
            `${API_BASE_URL}/spreadsheets/${spreadsheetId}/permissions/${encodeURIComponent(userEmail)}`,
            {
                method: 'DELETE',
                headers: this.getAuthHeader(),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to remove permission');
        }
    }

    /**
     * Get WebSocket URL for spreadsheet collaboration
     */
    getWebSocketUrl(spreadsheetId: string): string {
        const token = localStorage.getItem('access_token');
        const wsBaseUrl = API_BASE_URL.replace('http', 'ws');
        return `${wsBaseUrl}/ws/spreadsheets/${spreadsheetId}?token=${token}`;
    }

    // Prototype: import spreadsheet by filename only (server creates empty file)
    async importSpreadsheetExcel(file: File): Promise<SpreadsheetInfo> {
        const form = new FormData();
        form.append('file', file);
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/spreadsheets/import`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            body: form,
        });
        if (!response.ok) {
            try {
                const err = await response.json();
                throw new Error(err?.detail || 'Failed to import spreadsheet');
            } catch {
                throw new Error('Failed to import spreadsheet');
            }
        }
        return await response.json();
    }

    // Prototype: export empty xlsx for selected spreadsheet
    async exportSpreadsheetExcel(id: string): Promise<Blob> {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/spreadsheets/${id}/export`, {
            method: 'GET',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!response.ok) {
            throw new Error('Failed to export spreadsheet');
        }
        return await response.blob();
    }

    // Stats: log a visit event
    async logVisit(event: 'dashboard' | 'spreadsheet_open', spreadsheetId?: string): Promise<void> {
        const token = localStorage.getItem('access_token');
        await fetch(`${API_BASE_URL}/stats/visit?event=${encodeURIComponent(event)}${spreadsheetId ? `&spreadsheet_id=${encodeURIComponent(spreadsheetId)}` : ''}`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
    }

    // Stats: summary for dashboard
    async getStatsSummary(days = 7): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/stats/summary?days=${days}`, {
            method: 'GET',
            headers: this.getAuthHeader(),
        });
        if (!response.ok) throw new Error('Failed to load stats');
        return await response.json();
    }

    // History: spreadsheet changes
    async getSpreadsheetHistory(id: string, days = 30, limit = 100): Promise<{ changes: any[]; total: number }>{
        const response = await fetch(`${API_BASE_URL}/stats/spreadsheets/${id}/history?days=${days}&limit=${limit}`, {
            method: 'GET',
            headers: this.getAuthHeader(),
        });
        if (!response.ok) throw new Error('Failed to load history');
        return await response.json();
    }

    /**
     * Import Excel (.xlsx) file to Mongo via backend
     */
    async importExcel(file: File): Promise<{ inserted: number }> {
        const form = new FormData();
        form.append('file', file);

        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/files/import`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            body: form,
        });
        if (!response.ok) {
            try {
                const data = await response.json();
                throw new Error(data?.detail || 'Failed to import file');
            } catch {
                throw new Error('Failed to import file');
            }
        }
        return await response.json();
    }

    /**
     * Export Mongo data as Excel file
     */
    async exportExcel(): Promise<Blob> {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/files/export`, {
            method: 'GET',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!response.ok) {
            throw new Error('Failed to export data');
        }
        return await response.blob();
    }
}

export const apiService = new ApiService();
