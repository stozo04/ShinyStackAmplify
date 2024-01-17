import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // TODO: Change Logo

  constructor(private auth: AuthService) {
    console.log('auth: ', auth)

  }
}
