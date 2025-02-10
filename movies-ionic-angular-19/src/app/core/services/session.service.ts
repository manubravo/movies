import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../dtos/login.dto';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private apiUrl = environment.VITE_BACKEND_URL;

  userToken = signal<string | null>(null);
  tokenLoaded = signal(false);

  constructor(private http: HttpClient) {}

  async initSession() {
    const storedToken = await Preferences.get({ key: 'token' });

    if (storedToken.value) {
      this.userToken.set(storedToken.value);
    }

    this.tokenLoaded.set(true);
  }

  async login(credentials: LoginDto) {
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials)
      );

      if (response?.token) {
        this.userToken.set(response.token);
        await Preferences.set({ key: 'token', value: response.token });
      }
    } catch (error) {
      console.error('Error login:', error);
      throw error;
    }
  }

  async register(userData: { firstName: string; lastName: string; email: string; password: string; birthDate: string }) {
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/auth/register`, userData));
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error;
    }
  }

  async logout() {
    await Preferences.remove({ key: 'token' });
    this.userToken.set(null);
  }
}