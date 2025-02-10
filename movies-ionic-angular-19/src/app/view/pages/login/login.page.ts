import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/services/session.service';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  goToRegister() {
    this.router.navigate(['/register'], { replaceUrl: true });
  }

  async onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    try {
      
      await this.sessionService.login({ email, password });

      (document.activeElement as HTMLElement)?.blur();
      
      this.router.navigate(['/latest'], { replaceUrl: true });
      
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  }
}