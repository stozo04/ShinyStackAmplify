import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {
    console.log('auth: ', auth)
  }

  public navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
