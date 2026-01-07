const AUTH_TOKEN_KEY = 'github_auth_token';
const AUTH_USERNAME_KEY = 'github_auth_username';

class AuthService {
  login(username: string, token: string): boolean {
    if (username && token) {
      // Limpiar localStorage antes de guardar nuevos valores
      this.logout();
      
      localStorage.setItem(AUTH_USERNAME_KEY, username);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USERNAME_KEY);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_TOKEN_KEY) !== null && 
           localStorage.getItem(AUTH_USERNAME_KEY) !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(AUTH_USERNAME_KEY);
  }

  getAuthHeader(): string | null {
    const username = this.getUsername();
    const token = this.getToken();
    
    if (username && token) {
      return 'Basic ' + btoa(`${username}:${token}`);
    }
    return null;
  }
}

export default new AuthService();
