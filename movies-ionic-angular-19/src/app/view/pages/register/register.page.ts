import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/services/session.service';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    birthDate: ['', [Validators.required]],
  });

  async onRegister() {
    if (this.registerForm.invalid) return;

    const { firstName, lastName, email, password, birthDate } = this.registerForm.value;

    try {
      await this.sessionService.register({ firstName, lastName, email, password, birthDate });

      (document.activeElement as HTMLElement)?.blur();
      
      this.router.navigate(['/login'], { replaceUrl: true });
      
    } catch (error) {
      console.error('Error en el registro', error);
    }
  }
}